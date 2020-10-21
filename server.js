const con = require("../../connections/index")
const checkEmail = async function (search, callback) {
  var dbo = con.getDb();
  dbo.collection("user").findOne(search, (err, result) => {
    if (result) {
      callback(undefined, result)
    }
    else {
      callback(err, undefined)
    }
  })
}
const registration = async (data, cb) => {
  var dbo = con.getDb()
  dbo.collection("user").insertOne(data, (err, result) => {
    if (err)
      cb(err, undefined)
    else
      cb(undefined, err)
  })
}
module.exports = { checkEmail, registration }



//  console.log(a,"one");
//  console.log(a.length,"two")
//  var b = await dbo.collection("user").insertOne(data)
// //  if(b.result.n>0)
// console.log(b,"three")
// console.log(b.length,"four")  


//  return b.result.n

//if(a)
// return "user found in db"
//   var b = dbo.collection("user").insertOne(data)
//   console.log(b)
//     if(!resl)
//     {
// dbo.collection("user").insertOne(data, function(err,result){
//         if(err)
//         {
//             console.log(err)
//             console.log("error occured while registering the user")
//         }
//         else
//         {
//             console.log("user registered succesfully")
//             res.send("registration successful")   
//         }   }); 
//         }
//     else
//         {
//             console.log("user already exists try login")
//             res.send("user already exists try login")
//         }   }); 
//}



