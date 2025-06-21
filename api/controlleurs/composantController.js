const composantService = require("../services/composantService");
const Composant = require("../models/composant");
const jwt = require("jsonwebtoken");
// récupére la liste des composants

module.exports.getComposants = (req, res) => {
  composantService
    .getComposant()
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