var notes = require("./server")
const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
router.post("/", async (req, res) => {
    var searchid = { email: req.body.email }
    var search = { email: req.body.email, password: req.body.password };
    notes.checkEmail(searchid, (err, result) => {
        if (result) {
            notes.checkEmail(search, (error, resl) => {
                if (resl) {
                    const token = jwt.sign({ searchid }, "my_secret_key1", { expiresIn: '1800s' })
                    if (token) {
                        notes.updateToken(searchid, token, (e, r) => {
                            if (e) {
                                throw e;
                            } else {
                                console.log("token updated to db")
                                res.send({ email: req.body.email, token: token })
                            }
                        })
                    }
                } else {
                    console.log("incorrect password")
                    res.send("incorrect password")
                }
            })
        }
        else {
            console.log("user dosen't exist try registration")
            res.send("user dosen't exist try registration")
        }
    })
})
/*token = (app)=>{
    
    app.post("/updatetoken",(req,res)=>{
        var dbo=con.getDb();
        dbo.collection("testing").updateOne({email:req.body.email},{$set:{token:req.body.token}},(err,result)=>{
            if(err)
            {
                res.send(err)
                throw err;
            }
            else
            {
                console.log("updated"+result)
                res.send("updated"+result)
            }
        })
    })
}*/
module.exports = router