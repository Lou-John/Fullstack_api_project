const mongoose = require('mongoose');

module.exports.connectDataBase = () => {
    mongoose.connect(process.env.MONGO_CONNECTION,   
        { useNewUrlParser:true, 
        useUnifiedTopology:true,
        dbName: "api_endpoint_chevalier"})   
        .then(async () => {
            console.log('Connexion à MongoDB réussie !');
            // Test: list collections
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log('Collections:', collections.map(c => c.name));
            // Optionally: try to count documents in a collection
            // const count = await mongoose.connection.db.collection('userauths').countDocuments();
            // console.log('UserAuth documents count:', count);
        })   
        .catch((err) => {
            console.log('Connexion à MongoDB échouée !', err);
        });     
}