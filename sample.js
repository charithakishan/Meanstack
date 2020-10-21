var jwt = require("jsonwebtoken")
const con = require("../connections/index")
exports.crud = (app) =>{
    
    app.post("/insert",ensuretoken, (req, res) => 
    {
     var dbo = con.getDb();
        var myobj = req.body

        console.log(req.token)

        jwt.verify(req.token,"my_secret_key1",function(err,data)
            {
                //console.log(data)
                if(err)
                {
                    console.log(err);
                    res.sendStatus(403);
                }
                else
                {
                console.log("token verified")
                }
            });

        dbo.collection("testing").insertOne(myobj, function(error, result) 
        {
            
            if (error) 
            {
                throw err;
            }
            else
            {
                console.log("after inserting result is:"+result)
                res.send("inserted result is:"+result)
            }
            
        });
    });

    app.get("/read",ensuretoken, (req, res) => {
        var dbo = con.getDb();
        
        dbo.collection("testing").find({}).toArray(function (err, result) {
            jwt.verify(req.token,"my_secret_key1",function(err,data)
            {
                //console.log(data)
                if(err)
                {
                    console.log(err);
                    res.sendStatus(403);
                }
                else
                {
                console.log("token verified")
                }
            });
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });

    app.post("/update",ensuretoken, (req, res) => {
        var dbo = con.getDb();
        
        var searchPreference = req.body.original;
        var updateWith = req.body.updateWith;
        
        dbo.collection("testing").updateOne(searchPreference, {$set:updateWith}, function (error, result) {
            jwt.verify(req.token,"my_secret_key1",function(err,data)
            {
                //console.log(data)
                if(err)
                {
                    console.log(err);
                    res.sendStatus(403);
                }
                else
                {
                console.log("token verified")
                }
            });
            if (error) 
            {
                console.log(err)
            }
            else 
            {
                res.send("updated succesfully")
                console.log("1 document updated");
            }
        });
});

    app.post("/delete",ensuretoken, (req, res) => {
        var dbo = con.getDb();
        var myquery = req.body
        jwt.verify(req.token,"my_secret_key1",function(err,data){
            if(err)
            {
                res.sendStatus(403);
            }
            else
            {
        dbo.collection("testing").deleteOne(myquery, function (err, obj) {
            if (err)
                throw err
            else
                res.send("deleted succesfully "+obj)
            console.log("1 document deleted "+obj);
        });
        }
    });
    });

    function ensuretoken(req,res,next){
        const bearerheader = req.headers["authorization"];
        if(typeof bearerheader !== "undefined")
        {
            console.log("working")
            const bearer = bearerheader.split(" ");
            const bearertoken = bearer[1];
            req.token = bearertoken;
            next();
        }
        else
        {
            res.sendStatus(403);
        }
        }
}