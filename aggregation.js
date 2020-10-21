var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/authentication";
var dbo = null
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        throw err;
    }
    else {
        console.log("connection established to mongodb");
        var dbo = db.db("authentication");
        dbo.collection("user").find({email:"ran7@gmail.com"},(err,result)=>{
            console.log(err,"err")
            console.log(result,"result")

        })
    }
})
        // var dba=mongo.collection('orders')
        // var userCollecttion=dba
        // userCollecttion.insert({"name":"kiran","item":"card"})
       /*  const abc = dbo.collection("pre address").aggregate([
            { $match:{mailid:"manchikantisaikiran777@gmail.com"} },
            { $group:{email:"$mailid",currenttown:"kanchipuram",currentpin:"631561"}}
        ])
        console.log(abc)*/
    // }
    // db.user.aggregate([
    // dbo.collection("user").aggregate([
    // {
    //     $lookup:{
    //         from: "permanentaddress",
    //         localField: "mailid",
    //         foreignField: "mailid",
    //         as: "details"
    //             }
    // },
    // {
    //     $lookup:{
    //         from: "currentaddress",
    //         localField: "mailid",
    //         foreignField: "mailid",
    //         as: "detailsof"
    //             } 
    // },
    // {$unwind:"$details"},
    // {$unwind:"$detailsof"},
    // {
    //     $project: {
    //         "_id": 1,
    //         "mailid": "$mailid",
    //         "name": "$name",
    //         "age": "$age",
    //         "gender": "$gender",
    //         "currenttown": "$detailsof.currenttown",
    //         "currentpincode": "$detailsof.currentpincode",
    //         "currentstate":"$detailsof.currentstate",
    //         "permanenttown": "$details.permanenttown",
    //         "permanentpincode":"$details.permanentpincode"
            
    //     }
    // }
    
    //  ]).toArray(function(err, res) {
    //      if (err) throw err;
    //     console.log(JSON.stringify(res));
    //  });
    // dbo.collection('student_details').aggregate([
    //     {$match:{name:"sai kiran"}},
    //     {
    //     $lookup:{
    //         from:"department",
    //         localField:"department",
    //         foreignField:"department",
    //         as:"details"
    //     }
    // },
    // {$unwind:"$details"},
    // {
    // $lookup:{
    //         from:"college_details",
    //         localField:"department",
    //         foreignField:"department",
    //         as:"detailsof"
    //     }
    // },
    //,{$unwind:"$details"},{$unwind:"$detailsof"}
    //{$unwind:"$detailsof"},
    //{$unwind:"$course"},
    //   {
    //       $project:
    //     {
    //           name:"$name",
    //           department:"$department",
    //           college:"$detailsof.college_name",
    //           course:"$details.course",
    //           marks:"$marks",
    //           sub_marks:"$details.course.marks",
    //           status:{$gt:["$marks","$details.course.marks"]}
    //     }
    // }      
//             ]).toArray(function(err, res) {
//                      if (err) throw err;
//                     console.log(res);
//                  });
//     }
// });








// db.getCollection('student_details').aggregate([
//     {$match:{name:"sai kiran"}},
//     {
//     $lookup:{
//         from:"department",
//         localField:"department",
//         foreignField:"department",
//         as:"details"
//     }
// },

// {$unwind:"$details"},
// {$unwind:"$details.course"},

// {$addFields:{eligiblityStatus:{ $cond: [ { $gte: [ "$marks", "$details.course.marks" ] }, "Eligible", "Not Eligible" ]}}},

//     {
//     $lookup:{
//         from:"college_details",
//         localField:"department",
//         foreignField:"department",
//         as:"college_details"
//     }
// },

// {$unwind:"$college_details"},

// {$project:{
//     "name":"$name",
//     "dept":"$department",
//     "college":"$college_details.college_name",
//     "course":"$details.course.subject",
//     "status":"$eligiblityStatus"
    
    
//     }}

// ])
