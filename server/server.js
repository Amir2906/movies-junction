require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes')

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log(`app is connected to database`);
    })
    .catch(err => {
        console.log({message: err.message});
    })

app.use('/api/user', userRoutes);
    
app.listen(process.env.PORT, console.log(`server running on port 5000`));