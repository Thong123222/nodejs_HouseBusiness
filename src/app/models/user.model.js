const { create } = require('browser-sync');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: 'String', required: true},
    email: { type: 'String', required: true},
    password: { type: 'String', required: true},
    phone: { type: 'String', required: true},
    resume: { type: 'String', default: '' },
    createdAt: { type: 'Date', default: Date.now() },
    updatedAt: { type: 'Date', default: Date.now() },
});

module.exports = mongoose.model('User', User);