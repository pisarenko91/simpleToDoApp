var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to the db via mongoose 
mongoose.connect("mongodb://test:test123@ds129541.mlab.com:29541/todo", { useNewUrlParser: true });

//creation of shcema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("Todo", todoSchema);

//var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "kick some coding ass" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get("/todo", function(req, res) {
        //get data grom mongoDb and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render("todo", { todos: data });
        });
    });

    app.post("/todo", urlencodedParser, function(req, res) {
        //get data from the view and add it to mongoDb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete("/todo/:item", function(req, res) {
        //delete the requested item from db itself
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};