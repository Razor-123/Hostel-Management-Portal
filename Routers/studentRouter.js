const express = require('express');
const studentRouter = express.Router();
require('../controller/studentController');
const {signup,login,logout,protectRoute} = require('../controller/authContoller');
const {getMyProfile,addComplaint, updateStudent, deleteStudent} = require('../controller/studentController')

studentRouter.route('/signup')
    .post(signup)
    .get((req,res)=>res.json({
        message:"get signup called"
    }))

studentRouter.route('/login')
    .post(login)
    .get((req,res)=>res.json({
        message:"get login called"
    }))

studentRouter.route('/logout')
    .get(logout)

studentRouter.use(protectRoute);

studentRouter.route('/myprofile')
    .get(getMyProfile)
    .patch(updateStudent)
    .delete(deleteStudent)

studentRouter.route('/addcomplaint')
    .post(addComplaint)

module.exports = studentRouter;