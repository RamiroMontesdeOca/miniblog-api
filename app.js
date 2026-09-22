const express = require("express");
const app = express();

const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
loadEnvFile('.env');
}

const authorsRouter = require('./routes/authors');

app.use(express.json());
app.use('/authors',authorsRouter);


module.exports = app