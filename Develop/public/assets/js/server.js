//set up dependencies

var express = require("express");
var path = require("path");

//build server
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create HTML routes
//GET /notes should return notes.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
//GET * should return index.html
app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

//The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

//API routes to be created-
//GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes/:note", function(req, res) {
    var chosen = req.params.note;
    console.log(chosen)
    return res.json 
});
//POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    notes.push(newNote);
    res.json(newNote);
}

//DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

//starts server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });