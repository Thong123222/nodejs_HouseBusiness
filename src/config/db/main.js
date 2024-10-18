const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/job_potal');
        console.log('Connect successfully!!!!');
    } catch (error) {
        console.log('Connect false!!!!');
    }
}

module.exports = { connect }; 