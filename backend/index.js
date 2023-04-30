const express = require('express');
const connectDB = require('./database/Database');
const cors = require('cors');

// environment variables
require('dotenv').config();

const app = express();

// express json
app.use(express.json())

connectDB();

// cors
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// create a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// routes configuration
// route
app.use('/api/user', require('./controllers/userControllers.js'))

// listen to the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
})