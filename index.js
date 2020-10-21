var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/authentication";
var dbo = null;
const connect = (cb) =>{
   if(dbo)
   {
  cb();
  }
  else
  {
  MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}, function (err, db)
   {
     if (err)
      {
        cb(err);
      }
      else
      {
        console.log("connection established to mongodb");
        dbo =  db.db("authentication");
      }  
    });
    }
  }
const getDb = ()=>{
return dbo;
}

module.exports={getDb,connect}