const ComposantCategorie = require("../models/composantCategorie");

module.exports.getComposantCategories = async (query) => {
  try {
    let composantCategorie = await ComposantCategorie.find(query);
    return composantCategorie;
  } catch (e) {
    throw Error("Error while querying composantCategories");
  }
};

//récupère un composantCategorie
module.exports.getComposantCategorie = async (query) => {
  try {
    let composantCategorie = await ComposantCategorie.findOne(query);
    return composantCategorie;
  } catch (e) {
    throw Error("Error while query all one composantCategorie : " + e);
  }
};

module.exports.createComposantCategorie = async (composantCategorie) => {
  try {
    return await composantCategorie.save();
  } catch (e) {
    throw Error("Error while creating composantCategorie : " + e);
  }
};

module.exports.updateComposantCategorie = async (query, composantCategorie) => {
  try {
    let composantCategorieUpdated = await ComposantCategorie.updateOne(query, composantCategorie);
    console.log(composantCategorieUpdated);
  } catch (e) {
    throw Error("Error while updating composantCategories");
  }
};

module.exports.deleteComposantCategorie = async (query, composantCategorie) => {
  try {
    let composantCategorie = await ComposantCategorie.deleteOne(query);
    console.log(composantCategorie);
  } catch (e) {
    throw Error("Error while deleting composantCategories");
  }
};
