const express = require('express');
const adminRouter = express.Router();
const {officer_signup,officer_login,logout,officerprotectRoute,officer_profile} = require('../controller/authContoller');
const {getAllComplaints, escalateComplaint, updateComplaintStatus} = require('../controller/complaintController')


adminRouter.route('/signup')
    .post(officer_signup)
    .get((req,res)=>res.json({
        message:"get signup called"
    }))

adminRouter.route('/login')
    .post(officer_login)
    .get((req,res)=>res.json({
        message:"get login called"
    }))

adminRouter.route('/logout')
    .get(logout)

adminRouter.use(officerprotectRoute);

adminRouter.route('/myprofile')
    .get(officer_profile)

adminRouter.route('/allcomplaints')
    .get(getAllComplaints)

adminRouter.route('/escalateComplaint/:id')
    .patch(escalateComplaint)

adminRouter.route('/updateComplaintStatus/:id')
    .patch(updateComplaintStatus)

module.exports = adminRouter;