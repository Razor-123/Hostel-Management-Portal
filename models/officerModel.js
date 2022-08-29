const mongoose = require('mongoose')
const db_link='mongodb+srv://shaleen:shaleen123@cluster0.kjzvegr.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link).then((db)=>{
    console.log("officer model connected");
}).catch((err)=>{
    console.log("database connection error: ",err);
})

const officerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password length must be eight"]
    },
    confirmPassword:{
        type:String,
        require:[true,"Please confirm the password"],
        validate:{
            validator: function(){
                return this.confirmPassword == this.password;
            },
            message:"Passwords not similar"
        }
    },
    officerId:{
        type:String,
        unique:true,
        required:[true,"Please enter your officer id"]
    },
    rank:{ // enum value : [officer_1,officer_2,officer_3]
        type:String,
        required:[true,"Please enter your hostel name"]
    }
})

officerSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

officerSchema.post('save',function(error,doc,next){
    if (error && error.name==="MongoServerError" && error.code === 11000) next(new Error('Email is already registered'));
    else next(error);
});

const officerModel = mongoose.model('officerModel',officerSchema);
module.exports = officerModel;
