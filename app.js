const express = require("express");
const app = express();

const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
loadEnvFile('.env');
}

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/authors',authorsRouter);
app.use('/posts', postsRouter);

module.exports = app