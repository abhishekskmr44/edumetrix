const mongoose = require("mongoose")


const pictureSchema = new mongoose.Schema({
     Heading: {type: String, required: true},
     Picture: {type: String, required: true},
     Tag: {type: String, required: true},
     userId:{type:String, required:true},


})

const PictureModel = mongoose.model("picture",pictureSchema)


module.exports = {
    PictureModel
}