const notes = require("express").Router();
const fs = require("fs");

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
  const newNote = {
    title: title,
    text: text,
  };

  // Read file first
  // Then put our data into that
  // And then overwrite the file
  fs.readFile(__dirname + "/../db/db.json", (err, data) => {
    if (err) {
      console.log("error", err);
    }
    const notes = JSON.parse(data);

    notes.push(newNote);
    fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notes), (err) => {
      if (err) {
        console.log("error");
      }
      res.send(newNote);
    });
  });
});
module.exports = notes;
