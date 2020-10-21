const express = require("express");
const router = express.Router();
const notes = require("./server")
router.post("/", async (req, res) => {
    console.log(req.body.email.length)
    var token1 = req.headers.token1;
    var mailid = {email:req.body.email};
    var myobj = [{},{ name: req.body.name, age: req.body.age, gender: req.body.gender, mailid: mailid }]
    var myobj1 = { currenttown: req.body.currenttown, currentpincode: req.body.currentpincode, mailid: mailid, currentstate: req.body.currentstate }
    var myobj2 = { mailid: mailid, permanenttown: req.body.permanenttown, permanentpincode: req.body.permanentpincode }
    const user = await notes.checkEmail(mailid,"user")
   // if (user) {
        // if (user.token == token1) {
            console.log("token verified")
            var data1 = await notes.insert(myobj, "user")
            var data2 = await notes.insert(myobj1, "currentaddress")
            var data3 = await notes.insert(myobj2, "permanentaddress")
            if ((data1.length > 0)&& (data2.length > 0) && (data3.length > 0)) 
            {
                console.log(data1,data2,data3)
                res.send("data inserted succesfully")
            }
        // } else {
        //     console.log("token doesn't match")
        //     res.send("token doesn't match")
        // }
    // } else {
    //     console.log("user doesn't exist try login")
    //     res.send("user doesn't exist try login")
    // }
})
module.exports = router