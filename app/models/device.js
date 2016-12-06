var mongoose = require('mongoose');

var DeviceSchema    = new mongoose.Schema({
    device_id: String,
    account_number: Number, 
    userId: String
})

module.exports = mongoose.model('Device', DeviceSchema);