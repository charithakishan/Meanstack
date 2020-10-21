var jwt = require("jsonwebtoken")
const con = require("../connections/index")
exports.crud = (app) => {

    app.post("/insert", (req, res) => {
        var dbo = con.getDb();
        var token1 = req.headers.token1;
        var mailid = req.body.email;
        var myobj = { name: req.body.name, age: req.body.age, gender: req.body.gender, mailid: mailid }
        var myobj1 = { currenttown: req.body.currenttown, currentpincode: req.body.currentpincode, mailid: mailid, currentstate: req.body.currentstate }
        var myobj2 = { mailid: mailid, permanenttown: req.body.permanenttown, permanentpincode: req.body.permanentpincode }

        dbo.collection("user").findOne({ email: mailid }, (err, data1) => {
            if (data1) {
                // console.log(data1)
                if (data1.token == token1) {
                    console.log("token verified with the one in db")
                    dbo.collection("user").insertOne(myobj).then(function (uresult) {
                        // var r = JSON.parse(result)
                        console.log("data inserted in user" + uresult)
                        //res.send("data inserted" + result)
                        dbo.collection("currentaddress").insertOne(myobj1).then(function (cresult) {
                            // var r = JSON.parse(result)
                            console.log("data inserted in current address" + cresult)
                            //res.send("data inserted" + result)

                            dbo.collection("permanentaddress").insertOne(myobj2).then(function (presult) {
                                // var r = JSON.parse(result)
                                console.log("data inserted in permanent address" + presult)
                                res.send("data inserted in user collection:" + uresult + "in current address:" + cresult + "in permanent address:" + presult)
                            }).catch(function(err){
                                console.log(err)
                            })
                        }).catch(function(err){
                            console.log(err)
                        })
                    }).catch(function(err){
                        console.log(err)
                    })


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

    app.get("/read/:email", (req, res) => {
        var dbo = con.getDb();
        var mailid = req.params.email;
        var token1 = req.headers.token1;

        dbo.collection("user").findOne({ email: mailid }, (err, data1) => {
            //console.log(data1)
            if (data1) {
                // console.log(data1)
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
                        // { $unwind: "$details" },
                        // { $unwind: "$detailsof" },
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

    app.post("/update", (req, res) => {
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

    app.post("/delete", (req, res) => {
        var dbo = con.getDb();
        var myquery = { college: req.body.college }
        var token1 = req.headers.token1;

        dbo.collection("user").findOne({ email: req.body.email }, (err, data1) => {
            if (data1) {
                // console.log(data1)
                if (data1.token == token1) {
                    console.log("token verified with the one in db")

                    dbo.collection("user").deleteOne(myquery, function (err, obj) {
                        if (err)
                            throw err
                        else
                            res.send("deleted succesfully " + obj)
                        console.log("1 document deleted " + obj);
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

    app.post("/example",async  (req, res) => {
        var dbo = con.getDb();

        await dbo.collection("qwerty").insertOne(req.body, function (error, data) {
           // if (error) throw error;
            console.log("data inserted 1" + data)
        })

         await dbo.collection("qwerty").findOne({ name: req.body.name }, function (err, result) {
            // if (err) {
            //     console.log(err);
            // }
            // else {
                console.log("after reading data 2" + JSON.stringify(result))
            //}
        });

         await dbo.collection("qwerty").updateOne({ name: req.body.name }, { $set: { mail: "manchikanti" } }, function (error, result) {
            // if (error) {
            //     console.log(err);
            // }
            // else {
                console.log("after updating data 3" + result)
            //}
        });

        await dbo.collection("qwerty").findOne({ name: req.body.name }, function (err, result) {
            // if (err) {
            //     console.log(err);
            // }
            // else {
                console.log("after reading data 4" + JSON.stringify(result))
            //}
        });

        await dbo.collection("qwerty").deleteOne({ name: req.body.name }, function (err, obj) {
            // if (err)
            //     throw err
            // else
                // res.send("deleted succesfully "+obj)
                console.log("document deleted 5" + obj);
        });
        
        
        res.send("operations done")
    })
    

    app.post("/promise", (req, res) => {
        var dbo = con.getDb();

        dbo.collection("qwerty").insertOne(req.body, function (error, data) {
            if (error) throw error;
            console.log("data inserted 1" + data)
        })

        dbo.collection("qwerty").findOne({ name: req.body.name }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("after reading data 2" + JSON.stringify(result))
            }
        });

        dbo.collection("qwerty").updateOne({ name: req.body.name }, { $set: { mail: "manchikanti" } }, function (error, result) {
            if (error) {
                console.log(err);
            }
            else {
                console.log("after updating data 3" + result)
            }
        });

        dbo.collection("qwerty").findOne({ name: req.body.name }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("after reading data 4" + JSON.stringify(result))
            }
        });

        dbo.collection("qwerty").deleteOne({ name: req.body.name }, function (err, obj) {
            if (err)
                throw err
            else
                // res.send("deleted succesfully "+obj)
                console.log("document deleted 5" + obj);
        });
        res.send("operations done")
    })



}

