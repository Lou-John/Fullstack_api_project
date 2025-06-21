const composantService = require("../services/composantService");
const Composant = require("../models/composant");
const jwt = require("jsonwebtoken");
// récupére la liste des composants
/**
 * @swagger
 * /api/composants:
 *   get:
 *     summary: Get all composants
 *     tags: [Composants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved composants
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
 *                     $ref: '#/components/schemas/Composant'
 *                 message:
 *                   type: string
 */
module.exports.getComposants = (req, res) => {
  composantService
    .getComposants()
    .then((composants) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composants,
          message: "Successfully retrieved composants",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/composants/{id}:
 *   get:
 *     summary: Get a composant by ID
 *     tags: [Composants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The composant ID
 *     responses:
 *       200:
 *         description: Successfully retrieved composant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Composant'
 *                 message:
 *                   type: string
 */
module.exports.getComposant = (req, res) => {
  composantService
    .getComposants({ _id: req.params.id })
    .then((composants) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composants,
          message: "Successfully composants Retieved",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/composants:
 *   post:
 *     summary: Create a new composant
 *     tags: [Composants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Composant'
 *     responses:
 *       201:
 *         description: Successfully created composant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Composant'
 *                 message:
 *                   type: string
 */
module.exports.createComposant = async (req, res) => {
  try {
    // crée un composant d'authentification
    let composant = Composant(req.body);
    composant = await composantService.createComposant(composant);
    return res.status(201).json({
      status: 201,
      data: composant,
      message: "Succesfully Composant Created",
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
 * /api/composants/{id}:
 *   put:
 *     summary: Update a composant by ID
 *     tags: [Composants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The composant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Composant'
 *     responses:
 *       200:
 *         description: Successfully updated composant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Composant'
 *                 message:
 *                   type: string
 */
module.exports.updateComposant = (req, res) => {
  composantService
    .updateComposant({ _id: req.params.id }, req.body)
    .then((composant) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composant,
          message: "Successfully composants Updated",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/composants/{id}:
 *   delete:
 *     summary: Delete a composant by ID
 *     tags: [Composants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The composant ID
 *     responses:
 *       200:
 *         description: Successfully deleted composant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Composant'
 *                 message:
 *                   type: string
 */
module.exports.deleteComposant = (req, res) => {
  composantService
    .deleteComposant({ _id: req.params.id })
    .then((composants) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composants,
          message: "Successfully composants Deleted",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};