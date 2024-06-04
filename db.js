const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/restaurant';

//set up connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.log('Connection error', err);
});

db.on('disconnected', () => {
    console.log('Connection Disconnected');
});

module.exports = db;

//comment added