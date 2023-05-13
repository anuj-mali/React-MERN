const router = require('express').Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/test', (req,res) => {
    res.send("Welcome");
});


// ANCHOR REGISTER API
// ******************************************** REGISTER API ********************************************
router.post('/register', async (req, res)=>{
    // console.log(req.body);

    // unpacking
    const {fname, lname, email, password} = req.body;

    // validation
    if(!(fname && lname && email && password)){
        return res.status(400).json({msg: "All fields are required"})
    }



    try {
        // check existing user
        const userExists = await User.exists({email});

        if(userExists){
            return res.status(400).json({msg: "User already exists."})
        }

        const salt = await bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            fname: fname,
            lname: lname,
            email: email,
            password: passwordHash
        });
        newUser.save()

        res.json({msg: "User registered successfully"})

    } catch (error) {
        res.status(500).json({msg:"User registration failed"})
    }

    // res.send('Register');
})



// ANCHOR LOGIN API 
// ******************************************** LOGIN API ********************************************
router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    
    // validation
    if(!(email && password)){
        return res.status(400).json({msg: "All fields are required"})
    }

    try{
        const userExists = await User.findOne({email});
        
        // check if user exists
        if(!userExists){
            return res.status(403).json({msg:"User not found."})
        }

        // check if password is correct
        const validatePassword = await bcrypt.compareSync(password, userExists.password);
        if(!validatePassword){
            return res.status(403).json({msg:"Incorrect Password"});
        }

        const token = jwt.sign({id: userExists._id}, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 24*60*60*1000)
        })
        
        res.json({
            token: token,
            user: userExists,
            msg: "Welcome",
        });

        res.send();

    }catch(error){
        return res.status(500).json({msg:"Login Failed"})
    }
})

module.exports = router;