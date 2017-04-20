
/**
 * Created by chamod on 4/20/17.
 */

var express = require('express');
var router = express.Router();


var User=require('../models/user');


router.post('/', function(req, res, next) {

    var db = req.db;
    var collection = db.get('users');
    collection.findOne({email:req.body.user_email},function(e,user){

        if(user!=null) {
            user.daily_data.push(req.body.daily_data);

            collection.update({email: user.email}, {daily_data: user.daily_data}, function (err, data) {
                if (err != null) {
                    res.send(JSON.stringify({success: false, msg: err}));
                }
                else {
                    res.send(JSON.stringify({success: false, msg: data}));
                }
            });
        }

    });


    // User.findOne({email:req.body.user_email},function (err,user) {
    //
    //     user.daily_data.push(req.body.daily_data);
    //
    //     user.save(true);
    //
    //     res.send(JSON.stringify({success:false,msg:user.daily_data}));
    // });

});



module.exports = router;