const express = require("express");
const fs = require("fs");
const path = require("path");
const api = require("./routes");
const PORT = process.env.PORT || 5501;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

app.use(express.static("public"));

//It looks like I have to make a get request, a post request and a delete request

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
