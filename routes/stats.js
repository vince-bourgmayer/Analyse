var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Survey = require('../models/survey');
var Record = require('../models/record');
var router = express.Router();

router.get('/charts', function (req, res) {
    res.render('chartsMenu', {});
});

router.get("/charts/menu", function(req,res){
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id}, function(err, surveys){
                res.render('chartsMenu', {'surveys': surveys});
            });
        });
    }
    else{
        res.redirect('/');         
    }
});

router.post('/charts/addForm', function(req, res){
    //A revoir!(requete un peu inutile...)
    if(req.body.survey != 'none' && req.session.passport.user){
        Survey.find({user:usr._id}, function(err, surveys){
            res.render('chartsMenu', {'highcharts': 'true', 'surveys': surveys});
        });
    }
    else{
        res.redirect('/');       
    }
});
module.exports = router;