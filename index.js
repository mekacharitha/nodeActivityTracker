const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // initialize an app
const routes = require('./routers');

app.use(cors())
app.use(bodyParser.json()); // parse json

const port = 8000;


app.use('/', routes);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started on port ${port}`);
    }
})

app.use((error, req, res, next) => {
    res.json({
        success: false,
        error,
    })
});