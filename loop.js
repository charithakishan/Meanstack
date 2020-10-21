var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/authentication";
MongoClient.connect(url,(err,db)=>{
    var dbo=db.db("authentication")
    // var collections=["abc","def","ghi"]
    // var datatoinsert=[  { name: req.body.name, age: req.body.age, gender: req.body.gender, mailid: mailid },
    //                     { currenttown: req.body.currenttown, currentpincode: req.body.currentpincode, mailid: mailid,
    //                          currentstate: req.body.currentstate },
    //                     { mailid: mailid, permanenttown: req.body.permanenttown, permanentpincode: req.body.permanentpincode }
    //                 ]
    // for(var i=0;i<collections.length;i++)
    // dbo.collection(collections[i]).insertOne(datatoinsert[i])
  //  setTimeout(()=>{
    console.log("before inserting")
    var abc=dbo.collection("zxc").insertOne({dsfsf:"fsdfdsggfds"})
//
    //
        console.log("afterr inserting")
        //setTimeout(()=>{
    console.log(abc)
//},2000)
    
//},2000)
})