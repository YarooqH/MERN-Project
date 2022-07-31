require('dotenv').config()

const express = require('express');
const router = require('./routes/handler');
const mongoose = require('mongoose');
const msg = require('./models/messages');

const io = require('socket.io')(1800);

const app = express();

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

app.use(express.json());

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log(req.path, req.method)
    next();
})

// app.get('/', (req, res) => {
//     res.json({
//         text: 'Henlo World'
//     })
// })

app.use('/api', router);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB');
            console.log('Server is running on port ' + process.env.PORT);
        })
    })
    .catch(err => console.log(err));


// process.env