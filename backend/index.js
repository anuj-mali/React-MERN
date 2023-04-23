const express = require('express');

const app = express();

// create a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// listen to the server
app.listen(5000, ()=>{
    console.log(`Server running at port 5000`);
})