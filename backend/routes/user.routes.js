const {Router} = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



require("dotenv").config()

const {UserModel} = require("../models/User.model.js")

const userController = Router();

userController.post("/signup",(req,res)=>{
    const {email, password, age} = req.body;
    
    
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.send("Something went wrong, please try again")
        }


        const user = new UserModel({
            email,
            password:hash,
            age
        })
        


        // try catch will solve a lot of errors
       try {
         await user.save()

        res.json({msg:"Signup successfull"})
       } catch (err) {
        console.log(err)
        res.send("Soemthing went wrong, please try again ")
       }
        
    })


    // res.send("Signup") was giving a huge problem of can't set headers after they are passed etc
})

// since await is here so we have to make the function async
userController.post("/login", async(req,res)=>{
    const {email,password} = req.body;
// we don't have the hash here so we have to get it from the database
    const user = await UserModel.findOne({email})
    const hash = user.password

    bcrypt.compare(password,hash, function(err,result){
        // this error comes if something goes wrong with bcrypt library
        if(err){
            res.send("Something went wrong, please try again")
        }
        // if we're able to match hash bcrypt
        if(result){

          const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);

          res.json({message:"Login Successfull", token})

        }else{
            res.send("Invalid credentials please ignup if you haven't already.")
        }

    });
})


module.exports = {
    userController
}