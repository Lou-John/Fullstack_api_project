
const configurationService = require("../services/configurationService");
const Configuration = require("../models/configuration");
const jwt = require("jsonwebtoken");
// récupére la liste des configurations

module.exports.getConfigurations = (req, res) => {
  configurationService
    .getConfiguration()
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
