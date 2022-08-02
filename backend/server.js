require('dotenv').config()

const express = require('express');
const router = require('./routes/handler');
const mongoose = require('mongoose');
const cors = require('cors');
const msg = require('./models/messages');

const io = require('socket.io')(1800);

io.on('connection', (socket) => {
    socket.emit('message', 'Welcome to the chat');
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
});

const app = express();

var corsOptions = {
    origin: 'http://localhost:5173/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11) choke on 204
}

app.use(()=> {
    express.json();
    cors();
    // console.log("sagdgas")
    // next();
});
// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    console.log(req.path, req.method);

    next();
})

// app.get('/', cors(corsOptions), (req, res) => {
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