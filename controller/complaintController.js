const studentModel = require('../models/studentModel');
const complaintModel = require('../models/complaintModel');

module.exports.getAllComplaints = async function getAllComplaints(req,res){
    try{
        let allcomplaints = await complaintModel.find();
        res.json({
            status:"ok",
            message:"complaints fetched success",
            data:allcomplaints
        })
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.escalateComplaint = async function escalateComplaint(req,res){ // increment officer rank
    try{
        let complaint_id = req.params.id;
        const complaint = await complaintModel.findById(complaint_id);
        if (complaint){
            //console.log(complaint);
            if (complaint['status']=="officer1"){
                complaint['status']="officer2";
            }else {
                complaint['status']="officer3";
            }
            await complaint.save();
            res.json({
                status:"ok",
                message:"complaint escalated",
                data:complaint
            })
        }else{
            res.json({
                status:"error",
                "message":"complaint not found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.updateComplaintStatus = async function updateComplaintStatus(req,res){ // update status to accepted or rejected
    try{
        let complaint_id = req.params.id;
        let data = req.body;
        const complaint = await complaintModel.findById(complaint_id);
        if (complaint){
            complaint['status'] = data['status'];
            await complaint.save();
            res.json({
                status:"ok",
                "message":"complaint updated",
                data:complaint
            })
        }else{
            res.json({
                status:"error",
                "message":"complaint not found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}