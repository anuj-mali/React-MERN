const router = require('express').Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');

router.get('/test', (req,res) => {
    res.send("Welcome");
});

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

router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    
    // validation
    if(!(email && password)){
        return res.status(400).json({msg: "All fields are required"})
    }
    
    try{
        const userExists = await User.findOne({email});
        
        if(!userExists){
            return res.status(403).json({msg:"User not found."})
        }

        const validatePassword = await bcrypt.compareSync(password, userExists.password);
        if(!validatePassword){
            return res.status(403).json({msg:"Incorrect Password"});
        }

        res.status(200).json({msg: "Welcome"})

    }catch(error){
        return res.status(500).json({msg:"Login Failed"})
    }
})

module.exports = router;