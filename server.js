const con = require("../../connections/index")
const checkEmail = (searchid, callback) => {
  var dbo = con.getDb();
  dbo.collection("user").findOne(searchid, (err, result) => {
    if (result) {
      callback(undefined, result)
    }
    else {
      callback(err, undefined)
    }
  })
}
const updateToken = (email, token, cb) => {
  var dbo = con.getDb();
  dbo.collection("user").updateOne(email, { $set: { token: token } }, (err, resul) => {
    if (err)
      cb(err, undefined)
    else
      cb(undefined, resul)
  })
}
module.exports = { checkEmail, updateToken }



// exports.login = (req,res) => {

//         var searchid = {email:req.body.email}
//         var search ={email:req.body.email,password:req.body.password};
//         var dbo=con.getDb();
//   dbo.collection("user").findOne(searchid,function(err,resl){
//     if(resl)
//       {
//         dbo.collection("user").findOne(search,function(err,result){
//           if(result)
//             {
//               const token = jwt.sign({searchid},"my_secret_key1",{expiresIn: '1800s'});
//               if(token)
//               {
//                 dbo.collection("user").updateOne({email:req.body.email},{$set:{token:token}},(err,result)=>{
//                   if(err)
//                   {
//                       //res.send(err)
//                       throw err;
//                   }
//                   else
//                   {
//                       console.log("updated"+result+"token:"+token)
//                       res.send({
//                         email:req.body.email,
//                         token:token,
//                         status:status
//                     })
//                   }
//                 })
//               }

//             }
//           else
//             {
//               console.log("incorrect password")
//               res.send("incorrect password")
//             } });
//       }
//     else
//       {
//         console.log("user dosen't exist try registration")
//         res.send("user dosen't exist try registration")
//       } });
//       }