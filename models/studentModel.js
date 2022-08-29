const mongoose  = require('mongoose');
const db_link = 'mongodb+srv://shaleen:shaleen123@cluster0.kjzvegr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then((db)=>{
        console.log('student database connected');
    })
    .catch((err)=>{
        console.log("database connection error: ",err);
    })

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide your email"]
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
    studentId:{
        type:String,
        required:[true,"Please enter your student id"]
    },
    hostelName:{
        type:String,
        required:[true,"Please enter your hostel name"]
    },
    roomNumber:{
        type:Number,
        required:[true,"Please enter your room number"]
    },
    contactNumber:{
        type:String,
        required:[true,"Please enter your contact number"],
        minLength:[10,"Invalid contact number"],
        maxLength:[10,"Invalid contact number"]
    },
    my_complaints:[{
        type:mongoose.Schema.ObjectId,
        ref:'complaintModel'
    }]
})

studentSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

studentSchema.post('save',function(error,doc,next){
    if (error && error.name==="MongoServerError" && error.code === 11000) next(new Error('Email is already registered'));
    else next(error);
});

studentSchema.pre(/^find/,function(next){
    this.populate("my_complaints")
    next();
})


const studentModel = mongoose.model('studentModel',studentSchema);
module.exports = studentModel;