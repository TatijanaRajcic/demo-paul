const mongoose = require("mongoose"); // dans tous les models

const Schema = mongoose.Schema; //idem. 

const artistSchema = new Schema({ //c'est le moule de ton modèle
  name: String,
  description: String,
  isBand: Boolean,
  rates: [Number]
});

const artistModel = mongoose.model("Artist", artistSchema); //idem. fait le lien entre la collection de la base de données et le schéma qu'elle doit suivre

module.exports = artistModel; // idem. on l'exporte pour pouvoir l'utiliser dans nos routes, où l'on va se servir de ces données