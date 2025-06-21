const partenaireService = require("../services/partenaireService");
const Partenaire = require("../models/partenaire");
const jwt = require("jsonwebtoken");
// récupére la liste des partenaires
/**
 * @swagger
 * /api/partenaires:
 *   get:
 *     summary: Get all partenaires
 *     tags: [Partenaire]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved partenaires
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
 *                     $ref: '#/components/schemas/Partenaire'
 *                 message:
 *                   type: string
 */
module.exports.getPartenaire = (req, res) => {
  partenaireService
    .getPartenaire()
    .then((partenaires) =>
      res
        .status(200)
        .json({
          status: 200,
          data: partenaires,
          message: "Successfully retrieved partenaires",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/partenaires/{id}:
 *   get:
 *     summary: Get a partenaire by ID
 *     tags: [Partenaire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The partenaire ID
 *     responses:
 *       200:
 *         description: Successfully retrieved partenaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Partenaire'
 *                 message:
 *                   type: string
 */
module.exports.getPartenaire = (req, res) => {
  partenaireService
    .getPartenaire({ _id: req.params.id })
    .then((partenaires) =>
      res
        .status(200)
        .json({
          status: 200,
          data: partenaires,
          message: "Successfully partenaires Retieved",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/partenaires:
 *   post:
 *     summary: Create a new partenaire
 *     tags: [Partenaire]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partenaire'
 *     responses:
 *       201:
 *         description: Successfully created partenaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Partenaire'
 *                 message:
 *                   type: string
 */
module.exports.createPartenaire = async (req, res) => {
  try {
    // crée un partenaire d'authentification
    let partenaire = Partenaire(req.body);
    partenaire = await partenaireService.createPartenaire(partenaire);
    return res.status(201).json({
      status: 201,
      data: partenaire,
      message: "Succesfully Partenaire Created",
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
 * /api/partenaires/{id}:
 *   put:
 *     summary: Update a partenaire by ID
 *     tags: [Partenaire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The partenaire ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partenaire'
 *     responses:
 *       200:
 *         description: Successfully updated partenaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Partenaire'
 *                 message:
 *                   type: string
 */
module.exports.updatePartenaire = (req, res) => {
  partenaireService
    .updatePartenaire({ _id: req.params.id }, req.body)
    .then((partenaire) =>
      res
        .status(200)
        .json({
          status: 200,
          data: partenaire,
          message: "Successfully partenaires Updated",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/partenaires/{id}:
 *   delete:
 *     summary: Delete a partenaire by ID
 *     tags: [Partenaire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The partenaire ID
 *     responses:
 *       200:
 *         description: Successfully deleted partenaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Partenaire'
 *                 message:
 *                   type: string
 */
module.exports.deletePartenaire = (req, res) => {
  partenaireService
    .deletePartenaire({ _id: req.params.id })
    .then((partenaires) =>
      res
        .status(200)
        .json({
          status: 200,
          data: partenaires,
          message: "Successfully partenaires Deleted",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
}; 