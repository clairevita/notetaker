var fs = require("fs");
var path = require("path");

module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, notes) {
            res.json(JSON.parse(notes));
        });
    });

    app.post("/api/notes", function (req, res) {
        console.log(req.body);
        const newNote = req.body;
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, note) {

            const notes = JSON.parse(note)
            notes.push(newNote);
            console.log(notes);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
                res.json(true);
            });
        });
    })
  

  };