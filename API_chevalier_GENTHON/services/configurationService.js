const Configuration = require("../models/configuration");

module.exports.getConfigurations = async (query) => {
try {
    let configuration = await Configuration.find(query);
    return configuration;
} catch(e) {
    throw Error("Error while querying configurations");
}
}

//récupère un configuration
module.exports.getConfiguration = async (query) => {
    try {
        let configuration = await Configuration.findOne(query);
        return configuration;
    }
    catch(e) {
        throw Error("Error while query all one configuration : " + e);
    }
}

module.exports.createConfiguration = async (configuration) => {
    try {
       return await configuration.save(); 
    }
    catch(e) {
        throw Error("Error while creating configuration : " + e);
    }
}

module.exports.updateConfiguration = async (query, configuration) => {
    try {
        let configurationUpdated = await Configuration.updateOne(query, configuration);
        console.log(configurationUpdated);
    } catch(e) {
        throw Error("Error while updating configurations");
    }
};
    
module.exports.deleteConfiguration = async (query, configuration) => {
    try {
        let configuration = await Configuration.deleteOne(query);
        console.log(configuration);
    } catch(e) {
        throw Error("Error while deleting configurations");
    }
};

