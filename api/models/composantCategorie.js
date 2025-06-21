const mongoose = require("mongoose");

const composantCategorieSchema = mongoose.Schema(
  {
    nom: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
  },
  { collection: "ComposantCategorie" }
);

module.exports = mongoose.model("ComposantCategorie", composantCategorieSchema);
