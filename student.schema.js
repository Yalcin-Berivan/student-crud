const mongoose=require('mongoose');
const Student=new mongoose.Schema({
    name:String,
    surname:String,
    isActive:Boolean,
    studentId:Number,
    createdAt:Date,
    updatedAt:Date,
    address:String,
    tcId:Number
});
const studentModel=mongoose.model("student",Student);
module.exports=studentModel;