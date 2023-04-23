const express = require('express');
require('dotenv').config();

const app = express();

// create a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// listen to the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
})