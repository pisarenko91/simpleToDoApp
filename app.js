var express = require("express");
var todoController = require("./controllers/todoController");

var app = express();

//postavka template engine=a
app.set("view engine", "ejs");

//ruta za trazenje static fajlova
app.use(express.static("./public"));

//fire controllers
todoController(app);

//slusam na portu
app.listen(3000);
console.log("Slusam na portu 3000");