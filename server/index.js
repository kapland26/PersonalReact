require('dotenv').config();

const express = require('express');

const app = express();

const {
    SERVER_PORT,
} = process.env;

app.listen(SERVER_PORT, () =>
    console.log(`Listening on port: ${SERVER_PORT}`));

//  http://localhost:3005/auth