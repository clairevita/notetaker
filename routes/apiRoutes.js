//These packages are required to navigate our file system and write to internal documents.
var fs = require("fs");
var path = require("path");



//This content is exported when called.
module.exports = function(app) {
    //When the page is loaded, a GET call is committed to our database, this express call retrieves our data structure so the page can read it.
    app.get("/api/notes", function (req, res) {
        //Here we are explicitly reading the file
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, results) {
            if (err) throw err;
            //Here we are responding to the call, with our results parsed for the front end.
            res.json(JSON.parse(results));
        });
    });
//When a user creates a note, they are given the option to POST it. This express function completes this action to the backend.
    app.post("/api/notes", function (req, res) {
        //Here we are defining the content of the request they are submitting as a variable.
        const userNote = req.body;
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, results) {
            if (err) throw err;
            //Defines the results as an interactable noteList
            const noteList = JSON.parse(results)
            //Pushes the userNote to the noteList
            console.log(noteList.length);
            userNote.id = noteList.length + 1;
            console.log(userNote);
            noteList.push(userNote);
            //Overwrites the database with the updated list
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteList), function (err) {
                if (err) throw err;
                res.json(true);
            });
        });
    });

//When a user wants to delete a note, the following function is called
    app.delete("/api/notes/:id", function(req, res){
        //Here we get the ID integer to reference
        const deleteId = req.params.id;

        //Here we are reading the full note list
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, results) {
            if (err) throw err;
            
            //Parses the readFile results into an array
            toDelete = JSON.parse(results);
            //Since we use the length of the original array as our ID dependence, this goes through all of the ids AFTER the element to be deleted, and reduces it by 1
            for (i = deleteId-1; i < toDelete.length; i ++){--toDelete[i].id};
            //Here we are deleting the element from our array
            toDelete.splice(deleteId-1, 1);

            //Once we've deleted our element, and adjusted our ids, we write it to our database
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(toDelete), err => {
                if (err) throw err;
                //returns confirmation of completion.
                res.json(true);
                
            });

        });
    })
  };