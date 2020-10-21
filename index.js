const express = require("express");
const router = express.Router();
var notes = require("./server")
router.post("/", async (req, res) => {
    var data = req.body;
    var search = { email: req.body.email }
    notes.checkEmail(search, function (err, op) {
        if (op) {
            console.log("user exists try login")
            res.send("user exists try login")
        }
        else {
            notes.registration(data, (error, op1) => {
                if (error) {
                    console.log("error while registering user try again")
                    res.send("error while registering user try again")
                }
                else {
                    console.log("user registration succesful")
                    res.send("user registration succesful")
                }

            })
        }
    })
})
module.exports = router