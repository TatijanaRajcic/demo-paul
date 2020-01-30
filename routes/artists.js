const express = require("express");
const router = new express.Router(); // nécessaire pour pouvoir écrire des routes
const artistModel = require("./../models/Artist"); // require le model dont je vais avoir besoin dans mes routes


router.get("/all-artists", (req, res) => {
  artistModel
    .find() // find tous les artistes depuis la BD
    .then(artists => { // "artists" ici est le résultat de cette requête en base de données. j'aurais pu l'appeler data ou toto
      res.render("list-artists", {
        artists:artists, 
        css:"allArtists"
      }); // quand je hit "/all-artists" je render ma view list-artists, et dedans je peux utiliser les data "artists"
    })
    .catch(dbErr => {
      console.log("OH NO ! Database error", dbErr);
    });
});


router.get("/create-artist", (req, res) => {
  res.render("form-artist");
});

router.post("/create-artist", (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const isBand = req.body.isBand
  // const { name, description, isBand } = req.body; // manière plus courte de l'écrire

  // if some tests must be performed, do so before database query
  artistModel
    .create({
      name,
      description,
      isBand: isBand === "yes"
    })
    .then(dbRes => res.redirect("/all-artists"))
    .catch(dbErr => {
      console.log(dbErr);
      res.send("OH NO, an error occured while creating new artist !");
    });
});

// :id is a request param... a variable
router.get("/artist/:id", (req, res) => {
  // console.log(req.params.id);
  artistModel
    .findById(req.params.id)
    .then(artist => {
      res.render("page-artist", { artist });
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr));
});

module.exports = router;