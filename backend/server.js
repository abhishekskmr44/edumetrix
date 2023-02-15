const express = require("express");

const {userController} = require("./routes/user.routes")
const cors = require("cors")
const {pictureController} = require("./routes/picture.routes")

const {connection} = require("./config/db.js")

const {authentication} = require("./middlewares/authentication")

const app = express();

const PORT = 7777

app.use(express.json())

app.get("/",(req,res)=> {
    res.send("welcome")
})

app.use(cors())


// whatever is coming of the user we have to send to user controllers
app.use("/user", userController)

app.use(authentication)

app.use("/picture", pictureController)

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