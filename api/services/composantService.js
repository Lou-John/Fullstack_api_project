const Composant = require("../models/composant");

module.exports.getComposants = async (query) => {
try {
    let composant = await Composant.find(query);
    return composant;
} catch(e) {
    throw Error("Error while querying composants");
}
}

//récupère un composant
module.exports.getComposant = async (query) => {
    try {
        let composant = await Composant.findOne(query);
        return composant;
    }
    catch(e) {
        throw Error("Error while query all one composant : " + e);
    }
}

module.exports.createComposant = async (composant) => {
    try {
       return await composant.save(); 
    }
    catch(e) {
        throw Error("Error while creating composant : " + e);
    }
}

module.exports.updateComposant = async (query, composant) => {
    try {
        let composantUpdated = await Composant.updateOne(query, composant);
        console.log(composantUpdated);
    } catch(e) {
        throw Error("Error while updating composants");
    }
};
    
module.exports.deleteComposant = async (query, composant) => {
    try {
        let composant = await Composant.deleteOne(query);
        console.log(composant);
    } catch(e) {
        throw Error("Error while deleting composants");
    }
};