const fs = require("fs");

let notes = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');
const { stringify } = require("querystring");


module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        res.json(notes)
    })

    // app.get("/api/notes/:id", (req, res) => {
    //     const id = req.params.id;
    //     let found;
    //     notes.forEach(n => {
    //         if (id == n.id) {
    //             found = n;
    //             return res.json(n)
    //         }
    //     })
    //     return res.json(false)
    // })

    app.post("/api/notes", (req, res) => {
        const newNotes = req.body;
        newNotes.id = uuidv4();

        notes.push(newNotes);
        let jsonNotes = JSON.stringify(notes)
        fs.writeFile("./db/db.json", jsonNotes, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
            res.json(true)
        })
     
    })

    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
       
        notes = notes.filter(note => note.id != id)
        fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
            if(err) throw err;
            res.json(notes)
        })

    
    })
}