const Partenaire = require("../models/partenaire");

module.exports.getPartenaires = async (query) => {
try {
    let partenaire = await Partenaire.find(query);
    return partenaire;
} catch(e) {
    throw Error("Error while querying partenaires");
}
}

//récupère un partenaire
module.exports.getPartenaire = async (query) => {
    try {
        let partenaire = await Partenaire.findOne(query);
        return partenaire;
    }
    catch(e) {
        throw Error("Error while query all one partenaire : " + e);
    }
}

module.exports.createPartenaire = async (partenaire) => {
    try {
       return await partenaire.save(); 
    }
    catch(e) {
        throw Error("Error while creating partenaire : " + e);
    }
}

module.exports.updatePartenaire = async (query, partenaire) => {
    try {
        let partenaireUpdated = await Partenaire.updateOne(query, partenaire);
        console.log(partenaireUpdated);
    } catch(e) {
        throw Error("Error while updating partenaires");
    }
};
    
module.exports.deletePartenaire = async (query, partenaire) => {
    try {
        let partenaire = await Partenaire.deleteOne(query);
        console.log(partenaire);
    } catch(e) {
        throw Error("Error while deleting partenaires");
    }
};