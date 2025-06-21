const mongoose = require("mongoose");

const partenaireSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
  url: { type: String },
  composants: [
    {
      composant: { type: mongoose.Schema.Types.ObjectId, ref: "Composant", required: true },
      prix: { type: Number, required: true }
    }
  ]
}, {collection:'Partenaire'});

module.exports = mongoose.model("Partenaire", partenaireSchema);
