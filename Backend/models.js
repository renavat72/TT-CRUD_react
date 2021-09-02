const {model, Schema} = require('mongoose');

const UserModal = new Schema ({
    email: String,
    name: String,
});

module.exports = model('User', UserModal)