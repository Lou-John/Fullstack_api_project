const mongoose = require("mongoose");

const composantSchema = mongoose.Schema({
  categorie: { type: String, required: true },
  detail: { type: String, required: true },
  prix: { type: Number, required: true},
  marque: { type: String},
  titre: { type: String, required: true },
  image: { type: String },
}, {collection:'Composant'});

module.exports = mongoose.model("Composant", composantSchema);
