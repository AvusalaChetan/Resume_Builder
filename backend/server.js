require("dotenv").config();
const express = require("express");
const app = express();
app.use(cors({
  origin: "https://68c456576f8677599c5ab8b5--1resumebuilder.netlify.app",
  credentials: true
}));

const connectionDB = require("./config/connetion");
const limiter = require("./middlewares/rateLiming");
const port = process.env.PORT || 3000;
app.use(cors());
const cookieParser = require("cookie-parser"); 
const userId = require('./middlewares/userId')
//bultion mw
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


// router importing
const userRegisterRoute = require("./routers/userRegisterRouter");
const userRoute = require('./routers/userRoute');
const profileRoute = require("./routers/profileRoute");
const resumeRouter =  require('./routers/resumeRoute')
// api are here
app.use("/api/auth/register", limiter, userRegisterRoute);
app.use("/api/auth",limiter,userRoute);
app.use('/api/profile',userId,profileRoute)
app.use('/api/resume',resumeRouter)

app.get('/token',userId,(req,res)=>{
  const token = req.token
  try {
    res.status(200).json({message:'USER TOKEN',token:token})
    
  } catch (error) {
    console.log(error.message)
    res.json({message:error.message})
  }
})

connectionDB();
app.listen(port, () => {
  console.log(`SERVER IS WORKING AT ${port}`);
  console.log(`http://localhost:${port}`);
  console.log(`http://localhost:${port}/`);
});
