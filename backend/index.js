const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

require('dotenv').config();

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/user', userRouter);

app.listen(1234, () => {
  console.log('Server connected');
});