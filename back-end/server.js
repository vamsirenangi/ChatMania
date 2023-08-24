const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model')
const msgModel = require('./Msgmessage');
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors({origin: "*"}))

app.post('/register', async (req, res)=>{
    try {
        const { username, email, password, confirmpassword } = req.body;
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmpassword)
        let exist = await Registeruser.findOne({email});
        if (exist){
            return res.status(400).send('User already exist')
        }
        if (password !== confirmpassword){
            return res.status(400).send('Passwords are not matching')
        }

        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save()
        return res.status(200).send('Registered Succesfully')

    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal server Error')
    }

})

app.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
         let exist = await Registeruser.findOne({email});
         if (!exist){
            return res.status(400).send('User not found')
         }
         if (exist.password !== password){
            return res.status(400).send('Invalid Credentials')
         }
         let payload = {
            user: {
                id: exist.id
            }
         }
         jwt.sign(payload, "jwtSecure", {expiresIn: 3600000}, 
            (err, token)=>{
                if (err) throw err;
                return res.json({token})
            })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send('Internal server Error')
    }
})

app.get('/myprofile',middleware, async (req, res)=>{
    try {
        let exist = await Registeruser.findById(req.user.id)
        if (!exist){
            return res.status(400).send('user not exist')
        }
        res.json(exist)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
})

app.post('/addmsg', middleware, async (req,res)=>{
    try {
        const {text} = req.body;
        let exist = await Registeruser.findById(req.user.id);
        let newMsg = new msgModel({
            user: req.user.id,
            username: exist.username,
            text
        })
        await newMsg.save()
        let allMsg = await msgModel.find();
        return res.json(allMsg)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error');
    }
})

app.get('/getmsg', middleware, async (req, res)=>{
    try {
        let allMsg = await msgModel.find();
        return res.json(allMsg)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server error')
    }
})


mongoose.connect('mongodb+srv://VamsiRenangi:Mongodbdatabaserenangi1@cluster0.8ci47cv.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('db connected');
})

app.get('/', (req,res)=>{
    res.send('hello world')
})



app.listen(5000, ()=> console.log('server running'));