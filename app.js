const express = require('express');
const studentRouter = require('./Routers/studentRouter');
const adminRouter = require('./Routers/adminRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(cors({
    //origin:"https://hostel-management-portal.herokuapp.com",
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/student',studentRouter);
app.use('/admin',adminRouter);

const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
isProduction && app.use(express.static(path.join(__dirname,"public","build")));
isProduction &&
  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname,"public","build","index.html"));
  });

app.listen(port);
app.get('/',(req,res)=>{
    res.json({
        message:"Hello World!"
    })
})

