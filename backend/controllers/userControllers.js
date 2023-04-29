const router = require('express').Router();

router.get('/test', (req,res) => {
    res.send("Welcome");
});

router.post('/register', (req, res)=>{
    console.log(req.body);
    res.send('Register');
})

module.exports = router;