const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5501;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//It looks like I have to make a get request, a post request and a delete request

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
