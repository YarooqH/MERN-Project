require('dotenv').config()
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        text: 'Henlo World'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port' + process.env.PORT);
})

// process.env