const con = require("../connections/index")
const express = require("express");
const router = express.Router();
// exports.crud = (router) => {

    router.post("/insert", (req, res) => {
        var dbo = con.getDb();
        var token1 = req.headers.token1;
        var mailid = req.body.email;
        var myobj = { name: req.body.name, age: req.body.age, gender: req.body.gender, mailid: mailid }
        var myobj1 = { currenttown: req.body.currenttown, currentpincode: req.body.currentpincode, mailid: mailid, currentstate: req.body.currentstate }
        var myobj2 = { mailid: mailid, permanenttown: req.body.permanenttown, permanentpincode: req.body.permanentpincode }
        async function insert(collectionname, data) {
            var abc = await dbo.collection(collectionname).insertOne(data)
            return abc.ops
        }
        dbo.collection("user").findOne({ email: mailid }, async (err, data1) => {
            if (data1) {
                if (data1.token == token1) {
                    console.log("token verified with the one in db")
                    var user = await insert("user", myobj)
                    var currentaddress = await insert("currentaddress", myobj1)
                    var permanentaddress = await insert("permanentaddress", myobj2)
                    if ((user.length > 0) && (currentaddress.length > 0) && (permanentaddress.length > 0)) {
                        console.log(user, currentaddress, permanentaddress)
                        res.send("data inserted succesfully")
                    }
                }
                else {
                    console.log("token doesnt match")
                    res.send("token doesnt match")
                }
            }
            else {
                console.log("email doesn't exist")
                res.send("email doesn't exist")
            }
        })
    });

    router.get("/read/:email", (req, res) => {
        var dbo = con.getDb();
        var mailid = req.params.email;
        var token1 = req.headers.token1;

        dbo.collection("user").findOne({ email: mailid }, (err, data1) => {
            if (data1) {
                if (data1.token == token1) {
                    console.log("token verified with the one in db")
                    dbo.collection("user").aggregate([
                        // db.user.aggregate([
                        {
                            $lookup: {
                                from: "permanentaddress",
                                localField: "mailid",
                                foreignField: "mailid",
                                as: "details"
                            }
                        },
                        {
                            $lookup: {
                                from: "currentaddress",
                                localField: "mailid",
                                foreignField: "mailid",
                                as: "detailsof"
                            }
                        },
                        { $unwind: "$details" },
                        { $unwind: "$detailsof" },
                        {
                            $project: {
                                "_id": 1,
                                "mailid": "$mailid",
                                "name": "$name",
                                "age": "$age",
                                "gender": "$gender",
                                "currenttown": "$detailsof.currenttown",
                                "currentpincode": "$detailsof.currentpincode",
                                "currentstate": "$detailsof.currentstate",
                                "permanenttown": "$details.permanenttown",
                                "permanentpincode": "$details.permanentpincode"

                            }
                        }

                    ]).toArray(function (err, resu) {
                        if (err) throw err;
                        console.log(JSON.stringify(resu));
                        res.send(resu)
                    });
                    // dbo.collection("user").find({ email: mailid }).toArray(function(err, result) {
                    //     if (err) throw err;
                    //     // console.log(result);
                    //     res.send(result);
                    // });
                }
                else {
                    console.log("token doesnt match")
                    res.send("token doesnt match")
                }
            }
            else {
                console.log("email doesn't exist")
                res.send("email doesn't exist")
            }
        })
    });

    router.post("/", (req, res) => {
        var dbo = con.getDb();

        var searchPreference = req.body.original;
        var updateWith = req.body.updateWith;
        var token1 = req.headers.token1;

        dbo.collection("user").findOne({ email: req.body.email }, (err, data1) => {
            if (data1) {
                // console.log(data1)
                if (data1.token == token1) {
                    console.log("token verified with the one in db")
                    dbo.collection("user").updateOne(searchPreference, { $set: updateWith }, function (error, result) {
                        console.log(result)
                        if (error) {
                            console.log(err)
                        }
                        else {
                            res.send("updated succesfully")
                            console.log("1 document updated");
                        }
                    });
                }
                else {
                    console.log("token doesnt match")
                    res.send("token doesnt match")
                }
            }
            else {
                console.log("email doesn't exist")
                res.send("email doesn't exist")
            }
        })


    });

    router.post("/delete", (req, res) => {
        var dbo = con.getDb();
        var myquery = { shit: req.body.shit }
        var token1 = req.headers.token1;

        //dbo.collection("user").findOne({ email: req.body.email }, (err, data1) => {
          //  if (data1) {
                // console.log(data1)
            //    if (data1.token == token1) {
              //      console.log("token verified with the one in db")

                    dbo.collection("user").deleteOne(myquery, function (err, obj) {
                       // console.log(obj)
                        if (err)
                        console.log("abc")
                        else
                            res.send("deleted succesfully " + obj)
                        console.log("1 document deleted " + obj);
                    });


                //}
                //else {
                //     console.log("token doesnt match")
                //     res.send("token doesnt match")
                // }
            // }
            // else {
            //     console.log("email doesn't exist")
            //     res.send("email doesn't exist")
            // }
        //})
    });
// }
module.exports=router;
