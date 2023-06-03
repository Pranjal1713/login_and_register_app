import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginApp" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to db")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)



// Routes


app.post("/login",(req,res)=>{
    const {email, password} = req.body
    User.findOne({email}).then((user)=>{
        if(user){
            if(password === user.password){
                res.send({message: "Login Successfully" , user: user})
                console.log("login successfully")
            }else{
                // res.send({message: "Invalid Credentials" , user: null})
                res.send({message: "password didn't match"})
                console.log("password is wrong")
            }
        }else {
            res.send("User not registered")
        }


        // if(user){
        //     res.json({
        //         _id: user._id,
        //         name: user.name,
        //         email: user.email
        //         })
        // }
        // else{
        //     res.json({
        //         message: "Invalid Credentials"
        //     })
        // }
    })
})




app.post("/register",(req,res)=>{
    console.log(req.body)
    const {name , email, password} = req.body

    User.findOne({email: email}).then((user , err) =>{
        if(user){
            res.send({message: "user already exists"})
            console.log("user already exists")
        }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save().then(() =>{
                res.send({message: "Registration Successfully plz login"})
            }).catch((err)=> res.send({message: "error is here"}))
            // user.save().then(err =>{
            //     if(err){
            //         res.send(err)
            //     }
            //     else{
            //         res.send({message: "successfully registered"})
            //         console.log("user registered successfully")
            //     }
            // })
        }
    })

    
})

app.listen(9002, ()=>{
    console.log("Server is running on port 9002")
})

