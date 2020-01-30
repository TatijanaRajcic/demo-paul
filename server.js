require('dotenv').config();

const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');

const server = express(); // je créé une instance d'une app express que j'appelle server

// 1 - SERVER INITAL CONFIG
server.use(express.urlencoded({ extended: true })); // utile pour parser le body quand un utilisateur envoie un form notamment
server.use(express.static("./public")); // set up du dossier des assets
server.set("views", "./views"); // set up du dossier des views
server.set("view engine", "hbs"); // set up du template engine (hbs)
hbs.registerPartials("./views/partials"); // set up du dossier partials

// 2 - ROUTING

// Deux approches:
// Mettre les routes dans server.js mais devient vite illisible et désorganisé. A la rigueur, mettre juste la root route (home)

server.get("/", (req, res) => {
  res.render("home");
});

// Ecrire les autres dans des fichiers à part, dans le dossier Routes. Comment les regrouper? Bah comme ça fait sens pour nous
// Par ex: si tu as un modèle Artist tu pourrais très bien avoir un fichier js artists avec toutes les routes dedans, ou alors un fichier js par route 

server.use(require("./routes/artists"));

// 3 - SERVER KICKSTART

// Créer le fichier .env.
// Accéder à ses propriétés en faisait process.env. .... 
server.listen(process.env.PORT, () => {
  console.log(`server ready @ http://localhost:${process.env.PORT}`);
});

// 4 - BASE DE DONNÉES

mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



// Concernant le package.json:
// script "start" que l'on rajoute: script que l'on créé pour se faciliter la vie: on relance notre server à chaque fois que l'on fait une modif quelque part, que ce soit notre serveur ou nos views ou nos assetss


