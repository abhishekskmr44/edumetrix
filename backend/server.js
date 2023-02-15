const express = require("express");

const {userController} = require("./routes/user.routes")
const cors = require("cors")
const {pictureController} = require("./routes/picture.routes")

const {connection} = require("./config/db.js")
/**********************************************Multer*****************************************************/
// For handling multimedia
const sharp = require('sharp')

const multer  = require("multer");
// For working with the file and directory paths
const path = require("path");
// For interacting with the file system
const fs = require("fs");
// Provides access to utility functions
const util = require("util");
// ...such as this one to unlink or remove files from the file system
const unlinkFile = util.promisify(fs.unlink);


/**************************** ************************************************************************/

const {authentication} = require("./middlewares/authentication")

const app = express();

const PORT = 7777

app.use(express.json())

app.get("/",(req,res)=> {
    res.send("welcome")
})

app.use(cors())
/////////////////For Multer/////////////////////////////////////////////////////////////////
const upload = multer({
    limits: {
    fileSize: 1000000
    },
    fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb( new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
    }
    })
//////////////////////////////////////////////////////////////////////////////////////////


// whatever is coming of the user we have to send to user controllers
app.use("/user", userController)

app.use(authentication)

app.use("/picture", pictureController)




//////////////////////image upload////////////////////////////////
app.post('/image', upload.single('upload'), async (req, res) => {
    try {
    await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
    res.status(201).send('Image uploaded succesfully')
    } catch (error) {
    console.log(error)
    res.status(400).send(error)
    }
    })

////////////////////////////////////////////////////////////////////
app.listen(PORT, async()=>{
    try {
         await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})