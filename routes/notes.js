const notes = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json");

notes.get("/", (req, res) => {
  fs.readFile(__dirname + "/../db/db.json", (err, data) => {
    if (err) {
      console.log("error", err);
    }
    console.log("data", data);
    res.send(data);
  });
});

notes.post("/", (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const id = db.length;
  const newNote = {
    title: title,
    text: text,
    id: id,
  };

  fs.readFile(__dirname + "/../db/db.json", (err, data) => {
    if (err) {
      console.log("error", err);
    }
    var notesArr = JSON.parse(data);

    notesArr.push(newNote);
    fs.writeFile(
      __dirname + "/../db/db.json",
      JSON.stringify(notesArr),
      (err) => {
        if (err) {
          console.log("error");
        }
        res.send(newNote);
      }
    );
  });
});

notes.delete("/:id", (req, res) => {
  var idOfNote = req.params.id;
  for (let i = 0; i < db.length; i++) {
    var note = db[i];
    if (note.id == idOfNote) {
      db.splice(i, 1);
      fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(db));
      break;
    }
  }
});

module.exports = notes;
