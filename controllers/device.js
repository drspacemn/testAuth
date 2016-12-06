var Device = require('../app/models/device');

exports.postDevice = function(req, res, next){
    var device = new Device();

    device.device_id = req.body.device_id;
    device.account_number = req.body.account_number;
    device.userId = req.user._id;

    device.save(function(err){
        if(err)
            res.send(err);

            res.json({message: 'added device', data: device})
    })
}


exports.getDevices = function(req, res, next){
    Device.find({ userId: req.user._id }, function(err, devices){
        if(err)
            res.send(err);

        res.json(devices)
    })
}

exports.getDevice = function(req, res, next){
    Device.find({ userId: req.user._id, _id: req.params.device_id }, function(err, beer){
        if(err)
            res.send(err);

        res.json(beer);
    })
}
