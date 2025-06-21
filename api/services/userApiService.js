const User = require("../models/user");

module.exports.getUsers = async (query) => {
try {
    let user = await User.find(query);
    return user;
} catch(e) {
    throw Error("Error while querying users");
}
}

//récupère un user
module.exports.getUser = async (query) => {
    try {
        let user = await User.findOne(query);
        return user;
    }
    catch(e) {
        throw Error("Error while query all one user : " + e);
    }
}

module.exports.createUser = async (user) => {
    try {
       return await user.save(); 
    }
    catch(e) {
        throw Error("Error while creating user : " + e);
    }
}

module.exports.updateUser = async (query, user) => {
    try {
        let userUpdated = await User.updateOne(query, user);
        console.log(userUpdated);
    } catch(e) {
        throw Error("Error while updating users");
    }
};
    
module.exports.deleteUser = async (query, user) => {
    try {
        let user = await User.deleteOne(query);
        console.log(user);
    } catch(e) {
        throw Error("Error while deleting users");
    }
};

