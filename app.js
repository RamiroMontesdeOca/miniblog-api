const express = require("express");
const app = express();

const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
loadEnvFile('.env');
}

const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

app.use(express.json());
app.use('/authors',authorsRouter);
app.use('/posts', postsRouter);

module.exports = app