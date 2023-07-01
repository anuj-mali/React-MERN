const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.get("/test", (req, res) => {
    res.send("Welcome");
});

// ANCHOR REGISTER API
// ******************************************** REGISTER API ********************************************
router.post("/register", async (req, res) => {
    // console.log(req.body);

    // unpacking
    const { fname, lname, email, password } = req.body;

    // validation
    if (!(fname && lname && email && password)) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        // check existing user
        const userExists = await User.exists({ email });

        if (userExists) {
            return res.status(400).json({ msg: "User already exists." });
        }

        const salt = await bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            fname: fname,
            lname: lname,
            email: email,
            password: passwordHash,
        });
        newUser.save();

        res.json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: "User registration failed" });
    }

    // res.send('Register');
});

// ANCHOR LOGIN API
// ******************************************** LOGIN API ********************************************
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!(email && password)) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const userExists = await User.findOne({ email });

        // check if user exists
        if (!userExists) {
            return res.status(403).json({ msg: "User not found." });
        }

        // check if password is correct
        const validatePassword = await bcrypt.compareSync(password, userExists.password);
        if (!validatePassword) {
            return res.status(403).json({ msg: "Incorrect Password" });
        }

        const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET);

        // Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.json({
            token: token,
            user: userExists,
            msg: "Welcome",
        });

        res.send();
    } catch (error) {
        return res.status(500).json({ msg: "Login Failed" });
    }
});

// forget password
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    // validation
    if (!email) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ msg: "User not found." });
        }
        // create token
        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "10m" });

        // create link
        const link = `http://localhost:5000/api/user/reset-password/${user._id}/${token}`;

        // send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            html: `<h2>Please click on given link to reset your password</h2>
            <a href="${link}">${link}</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ msg: "Server Error" });
            } else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ msg: "Email has been sent, kindly follow the instruction" });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Forgot Password Failed" });
    }
});

// verify link
router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(403).json({ msg: "User not found." });
    }

    try {
        const secret = process.env.JWT_SECRET + user.password;
        const verifyToken = jwt.verify(token, secret);

        if (verifyToken) {
            res.render("index", { email: verifyToken.email });
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Link or Expired" });
    }
});

// reset password
router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const { password, confirmPassword } = req.body;

    // validation
    if (!(password && confirmPassword)) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Password do not match" });
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
        return res.status(403).json({ msg: "User not found." });
    }
    const secret = process.env.JWT_SECRET + user.password;
    try {
        const verifyToken = jwt.verify(token, secret);
        if (!verifyToken) {
            return res.status(403).json({ msg: "Invalid Link or Expired" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);

        await User.updateOne({ _id: id }, { $set: { password: passwordHash } });
        res.status(200).json({ msg: "Password Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Reset Password Failed" });
    }
});

module.exports = router;
