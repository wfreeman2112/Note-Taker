//set up dependencies

var express = require("express");
var path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//build server
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//create HTML routes
//GET /notes should return notes.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
//GET * should return index.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

//The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
var db = require ("./db/db.json")
//API routes to be created-
//GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
   res.json(db)
});
//POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {

    req.body.id = uuidv4()
    console.log(req.body)
    var newNote = req.body;
    db.push(newNote);
    fs.writeFile("./db/db.json",JSON.stringify(db),function(){
    res.json(newNote)
    })
    
});

//DELETE /api/notes/:id - Should resonceive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", function(req, res) {
  var newID = req.params.id;
  for (let i = 0; i < db.length; i++) {
       if(db[i].id  === newID){
         db.splice(i,1)
       }
  }
  fs.writeFile("./db/db.json",JSON.stringify(db),function(){
    res.json(db);
    })
 
});
//starts server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });