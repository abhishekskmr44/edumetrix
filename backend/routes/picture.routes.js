const {Router} = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const {PictureModel} = require("../models/Picture.model.js")

const pictureController = Router();

// pictureController.use((req,res,next)=>{
//     console.log("blahdlsjldkjls")
//     next()
// })

// whatever coming from "/picture" in server we are passing here
pictureController.get("/", async(req,res)=> {
    /**We need only that particular user's node**/ 
    const pictures = await PictureModel.find({userId: req.body.bodyuserId})


    res.send(pictures)
    
})


pictureController.post("/create", async(req,res)=> {
  
   const { Heading, Picture, Tag, userId } = req.body;
  
    const picture = new PictureModel({
           Heading,
           Picture, 
           Tag,
           userId
    })
    try {
        await picture.save()
        res.send("Picture created")    
      } catch (err) {
         res.send("something went worng") 
      }
//  res.send(Picture) was giving a huge problem until removed

    // res.send(Picture)
})


pictureController.delete("/delete/:pictureId", async(req,res)=>{
    const {pictureId} = req.params
    //req.body.userId was added by authentication middleware
    const deletedPicture = await PictureModel.findOneAndDelete({_id:pictureId,userId:req.body.userId})

    if(deletedPicture){
        res.send("deleted")
    }else{
        res.send("Couldn't delete")
    }
})




pictureController.patch("/edit/:pictureId", async(req,res)=>{
    const {pictureId} = req.params
    
    //req.body.userId was added by authentication middleware
    const deletedPicture = await PictureModel.findOneAndUpdate({_id: pictureId, userId:req.body.userId}, req.body)

    if(deletedPicture){
        res.send("Updated")
    }else{
        res.send("Couldn't update")
    }
})

module.exports = {
    pictureController
}