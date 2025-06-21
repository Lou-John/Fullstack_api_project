const userApiService = require("../services/userApiService");
const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// récupére la liste des users
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 */
module.exports.getUsers = (req, res) => {
  userApiService
    .getUsers()
    .then((users) =>
      res.status(200).json({
        status: 200,
        data: users,
        message: "Successfully users Retieved",
      })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 */
module.exports.getUser = (req, res) => {
  userApiService
    .getUsers({ _id: req.params.id })
    .then((users) =>
      res.status(200).json({
        status: 200,
        data: users,
        message: "Successfully users Retieved",
      })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 */
module.exports.createUser = async (req, res) => {
  try {
    // crée un user d'authentification
    let user = User(req.body);
    // hash le mdp avec bcrypt
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await userApiService.createUser(user);
    return res.status(201).json({
      status: 201,
      data: user,
      message: "Succesfully User auth Created",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 */
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userApiService.getUser({ email: email });
    if (!user) {
      console.log(email + "User not found");
      return res
        .status(401)
        .json({ error: "Authentication failed, wrong email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed, wrong password" });
    }
    // crée et retourne le token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    const response = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: token,
    };

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 */
module.exports.updateUser = (req, res) => {
  if (req.body.password) {
    req.body.password = crypto
      .createHmac("sha512", process.env.SECRET_KEY)
      .update(req.body.password)
      .digest("base64");
  }

  userApiService
    .updateUser({ _id: req.params.id }, req.body)
    .then((user) =>
      res.status(200).json({
        status: 200,
        data: user,
        message: "Successfully users Updated",
      })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 */
module.exports.deleteUser = (req, res) => {
  userApiService
    .deleteUser({ _id: req.params.id })
    .then((users) =>
      res.status(200).json({
        status: 200,
        data: users,
        message: "Successfully users Deleted",
      })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
