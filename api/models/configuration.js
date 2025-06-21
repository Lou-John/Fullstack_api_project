const mongoose = require("mongoose");

const configurationSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    composants: [
      {
        composant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Composant",
          required: true,
        },
        partenaire: { type: mongoose.Schema.Types.ObjectId, ref: "Partenaire" },
        prix: { type: Number },
      },
    ],
    date: { type: Date, default: Date.now },
    total: { type: Number },
  },
  { collection: "Partenaire" }
);

module.exports = mongoose.model("Configuration", configurationSchema);
