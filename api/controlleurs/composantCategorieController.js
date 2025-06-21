
const composantCategorieService = require("../services/composantCategorieService");
const ComposantCategorie = require("../models/composantCategorie");
const jwt = require("jsonwebtoken");
// récupére la liste des composantCategories
/**
 * @swagger
 * /api/composantCategories:
 *   get:
 *     summary: Get all composantCategories
 *     tags: [ComposantCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved composantCategories
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
 *                     $ref: '#/components/schemas/ComposantCategorie'
 *                 message:
 *                   type: string
 */
module.exports.getComposantCategories = (req, res) => {
  composantCategorieService
    .getComposantCategories()
    .then((composantCategories) =>


      res
        .status(200)
        .json({
          status: 200,
          data: composantCategories,
          message: "Successfully retrieved composantCategories",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/composantCategories/{id}:
 *   get:
 *     summary: Get a composantCategorie by ID
 *     tags: [ComposantCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The composantCategorie ID
 *     responses:
 *       200:
 *         description: Successfully retrieved composantCategorie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/ComposantCategorie'
 *                 message:
 *                   type: string
 */
module.exports.getComposantCategorie = (req, res) => {
  composantCategorieService
    .getComposantCategories({ _id: req.params.id })
    .then((composantCategories) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composantCategories,
          message: "Successfully composantCategories Retieved",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/composantCategories:
 *   post:
 *     summary: Create a new composantCategorie
 *     tags: [ComposantCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComposantCategorie'
 *     responses:
 *       201:
 *         description: Successfully created composantCategorie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/ComposantCategorie'
 *                 message:
 *                   type: string
 */
module.exports.createComposantCategorie = async (req, res) => {
  try {
    // crée un composantCategorie d'authentification
    let composantCategorie = ComposantCategorie(req.body);
    composantCategorie = await composantCategorieService.createComposantCategorie(composantCategorie);
    return res.status(201).json({
      status: 201,
      data: composantCategorie,
      message: "Succesfully ComposantCategorie Created",
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
 * /api/composantCategories/{id}:
 *   put:
 *     summary: Update a composantCategorie by ID
 *     tags: [ComposantCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The composantCategorie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComposantCategorie'
 *     responses:
 *       200:
 *         description: Successfully updated composantCategorie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/ComposantCategorie'
 *                 message:
 *                   type: string
 */
module.exports.updateComposantCategorie = (req, res) => {
  composantCategorieService
    .updateComposantCategorie({ _id: req.params.id }, req.body)
    .then((composantCategorie) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composantCategorie,
          message: "Successfully composantCategories Updated",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/composantCategories/{id}:
 *   delete:
 *     summary: Delete a composantCategorie by ID
 *     tags: [ComposantCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The composantCategorie ID
 *     responses:
 *       200:
 *         description: Successfully deleted composantCategorie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/ComposantCategorie'
 *                 message:
 *                   type: string
 */
module.exports.deleteComposantCategorie = (req, res) => {
  composantCategorieService
    .deleteComposantCategorie({ _id: req.params.id })
    .then((composantCategories) =>
      res
        .status(200)
        .json({
          status: 200,
          data: composantCategories,
          message: "Successfully composantCategories Deleted",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
