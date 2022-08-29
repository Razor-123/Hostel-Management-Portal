const mongoose = require('mongoose');
const db_link = 'mongodb+srv://shaleen:shaleen123@cluster0.kjzvegr.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then((db)=>{
        console.log("complaint database connected");
    })
    .catch((err)=>{
        console.log("database connection error: ",err);
    })

complaintSchema = mongoose.Schema({
    student:{ // hostel studnet_name contact_number
        type:mongoose.Schema.ObjectId,
        ref:'studentModel'
    },
    category:{ // enum : [hygiene,]
        type:String,
        required:[true,"Please choose the complaint category"]
    },
    topic:{
        type:String,
        required:[true,"Please enter the topic of complaint"]
    },
    description:{
        type:String,
        required:[true,"Please provide complaint description"]
    },
    availability:{
        type:String,
        required:[true,"Please enter your availablity"]
    },
    status:{ // enum : [officer1,officer2,officer3,accepted,rejected]
        type:String,
        default:"officer1"
    }
})

complaintSchema.pre(/^find/,function(next){
    //this.populate("student")
    next();
})

const complaintModel = mongoose.model('complaintModel',complaintSchema);
module.exports = complaintModel