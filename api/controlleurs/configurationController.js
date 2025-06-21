
const configurationService = require("../services/configurationService");
const Configuration = require("../models/configuration");
const jwt = require("jsonwebtoken");
// récupére la liste des configurations
/**
 * @swagger
 * /api/configurations:
 *   get:
 *     summary: Get all configurations
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved configurations
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
 *                     $ref: '#/components/schemas/Configuration'
 *                 message:
 *                   type: string
 */
module.exports.getConfigurations = (req, res) => {
  configurationService
    .getConfigurations()
    .then((configurations) =>


      res
        .status(200)
        .json({
          status: 200,
          data: configurations,
          message: "Successfully retrieved configurations",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/configurations/{id}:
 *   get:
 *     summary: Get a configuration by ID
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The configuration ID
 *     responses:
 *       200:
 *         description: Successfully retrieved configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Configuration'
 *                 message:
 *                   type: string
 */
module.exports.getConfiguration = (req, res) => {
  configurationService
    .getConfigurations({ _id: req.params.id })
    .then((configurations) =>
      res
        .status(200)
        .json({
          status: 200,
          data: configurations,
          message: "Successfully configurations Retieved",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/configurations:
 *   post:
 *     summary: Create a new configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuration'
 *     responses:
 *       201:
 *         description: Successfully created configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Configuration'
 *                 message:
 *                   type: string
 */
module.exports.createConfiguration = async (req, res) => {
  try {
    // crée un configuration d'authentification
    let configuration = Configuration(req.body);
    configuration = await configurationService.createConfiguration(configuration);
    return res.status(201).json({
      status: 201,
      data: configuration,
      message: "Succesfully Configuration Created",
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
 * /api/configurations/{id}:
 *   put:
 *     summary: Update a configuration by ID
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The configuration ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuration'
 *     responses:
 *       200:
 *         description: Successfully updated configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Configuration'
 *                 message:
 *                   type: string
 */
module.exports.updateConfiguration = (req, res) => {
  configurationService
    .updateConfiguration({ _id: req.params.id }, req.body)
    .then((configuration) =>
      res
        .status(200)
        .json({
          status: 200,
          data: configuration,
          message: "Successfully configurations Updated",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
/**
 * @swagger
 * /api/configurations/{id}:
 *   delete:
 *     summary: Delete a configuration by ID
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The configuration ID
 *     responses:
 *       200:
 *         description: Successfully deleted configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Configuration'
 *                 message:
 *                   type: string
 */
module.exports.deleteConfiguration = (req, res) => {
  configurationService
    .deleteConfiguration({ _id: req.params.id })
    .then((configurations) =>
      res
        .status(200)
        .json({
          status: 200,
          data: configurations,
          message: "Successfully configurations Deleted",
        })
    )
    .catch((error) =>
      res.status(400).json({ status: 400, message: error.message })
    );
};
