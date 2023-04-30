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

    res.send('Register');
})

module.exports = router;