const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const axios = require("axios");

const json_books = fs.readFileSync("src/books.json", "utf-8");
const books = JSON.parse(json_books);

router.get("/", (req, res) => {
  res.render("index", { books });
});

router.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

router.post("/new-entry", (req, res) => {
  let { title, author, image, description } = req.body;

  if (!title || !author || !image || !description) {
    res.status(400).send("pone los datos kpo");
    return;
  }

  let newBook = {
    id: uuidv4(),
    title,
    author,
    image,
    description,
  };
  books.push(newBook);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/books.json", json_books, "utf-8");
  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  books = books.filter((book) => {
    book.id != req.params.id;
  });

  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/books.json", json_books, "utf-8");
  res.redirect("/");
});

router.post("/rickandmorty", async (req, res) => {
  let json_rickAndMorty = fs.readFileSync("src/rickandmorty.json", "utf-8");
  let character = JSON.parse(json_rickAndMorty);
  try {
    const api = await axios.get("https://rickandmortyapi.com/api/character");
    if (character.length === 0) {
      // cargamos los pj a nuestra variable
      api.data.results.map((value) => {
        character.push({
          id: value.id,
          name: value.name,
          status: value.status,
          species: value.species,
        });
      });

      // guardando en json personajes
      json_rickAndMorty = JSON.stringify(character);
      fs.writeFileSync("src/rickandmorty.json", json_rickAndMorty, "utf-8");

      res.json({
        msg: "personajes cargados",
        character,
      });
    } else {
      res.send("personajes cargados");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/rickandmorty", (req,res)=>{
    let json_rickAndMorty = fs.readFileSync("src/rickandmorty.json", "utf-8");
    let character = JSON.parse(json_rickAndMorty);
    res.json({
        character
    })
})

router.delete("/delete/:id", (req, res)=>{
    let {id} = req.params;
    let json_rickAndMorty = fs.readFileSync("src/rickandmorty.json", "utf-8");
    let characters = JSON.parse(json_rickAndMorty);

    characters = characters.filter((character)=> character.id != id)
    

    json_rickAndMorty = JSON.stringify(characters);
    fs.writeFileSync("src/rickandmorty.json", json_rickAndMorty, "utf-8");

    res.json({
        msg:`se borro este pj con la id ${id}`,
        characters
    })

})

module.exports = router;
