const con = require("../connections/index")
const insert = async (data, collectionname) => {
    var dbo = con.getDb()
    var abc = await dbo.collection(collectionname).insert(data)
    return abc.ops
}
const checkEmail = async (email,collectionname)=>{
    var dbo = con.getDb()
    var abc = await dbo.collection(collectionname).findOne(email)
    return abc
}
module.exports = {insert,checkEmail}