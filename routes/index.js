var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Survey = require('../models/survey');
var Record = require('../models/record');
var Chart = require('../models/chart');
var fs = require('fs');
var router = express.Router();


//Récupère l'url de base et retourne la vue index avec l'objet req.user
//Si je ne me trompe pas "req" est un peu équivalent à $_POST ou $_GET en php (suivant le router.*** utilisé)
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          console.log(err);
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/survey', function(req, res) {
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id}, function(err, surveys){
                if(err){
                    console.log(err);
                }
                res.render('surveyMenu', {'surveys' : surveys});
            });
        });
    }else{
        res.redirect('/');
    }
});


router.get('/addSurvey', function(req, res) {
    if(req.session.passport.user){
        console.log("Call Add Survey");
        res.render('surveyAdd', {});
    }else{
        res.redirect('/');
    }
});

router.post('/addSurvey', function(req, res) {
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            if(err){return "Erreur";}
            s = new Survey({
                user: usr._id,
                dateStart:req.body.sDate,
                dateEnd:req.body.eDate,
                title:req.body.title,
                icon:req.body.icon,
                measuresTypes: [],
                tags:req.body.tags
            });
            s.save(function (err, s) {
                if (err) return console.error(err);
            });
            return res.redirect("/");
        });
    }
});
router.get('/updateSurvey', function(req,res){
    Survey.findOne({_id:req.param("survey")}, function(err,survey){
        res.render('surveyDetail', {'survey': survey});
    });
});
router.post('/updateSurvey', function(req,res){
    if(req.body.oid){
        console.log(req.body);
        Survey.findOne({_id:req.param("survey")}, function(err,survey){
            var mt = {title:req.body.title};
            if(req.body.standard){
                mt.standard = req.body.standard;
            }
            if(req.body.type){
                mt.type=req.body.type;
            }
            if(req.body.pvalue){
                mt.possibleValues = [];
                var ar = req.body.pvalue.split(',');
                for(var i =0; i < ar.length;i++){
                    mt.possibleValues.push(ar[i].trim());
                }
            }
            survey.measuresTypes.push(mt);
            survey.save(function(err){
                if(err){
                    console.log(err);
                    res.redirect('/');
                }else{
                    res.render('surveyDetail', {'survey': survey});                    
                }
            });
        });
    }else{
        res.redirect('/');
    }
});

router.get('/archiveSurvey', function(req,res){
    Survey.remove({_id:req.param('survey')}, function(err){
        if(err) return console.log(err);
        res.redirect('/survey');
    });
})
router.get('/deleteUsr', function(req,res){
    if(req.session.passport.user == 'Albert'){
        Account.remove({_id:req.param('usr')}, function(err){
            if(err) return console.log(err);
            res.redirect('/myCommunities');
        });
    }else{
        res.redirect('/');        
    }
})

router.get('/corbeauGenial', function(req,res){
    /*Account.remove({}, function(err){
        if(err) return console.log(err);
        Survey.remove({}, function(err){
            if(err) return console.log(err);*/
            Record.remove({}, function(err){
                if(err) return console.log(err);
                res.redirect('/');
            /*});
        });*/      
    });
    /*Chart.remove({},function(err){
        if(err) return console.log(err);
        res.redirect('/');
    });*/
});
router.get('/addRecord', function(req,res){
    Survey.findOne({_id:req.param("survey")}, function(err,survey){
        res.render('recordAdd', {'survey': survey});
    });
});
router.post('/addRecord', function(req,res){
    if(req.body.oid){
        rec = new Record({surveyID:req.body.oid});
        if(req.body.title){
            rec.title = req.body.title;
        }
        if(req.body.tags){
            rec.tags = [];
            var ar = req.body.tags.split(',');
            for(var i =0; i < ar.length;i++){
                rec.tags.push(ar[i].trim());
            }
        }
        Survey.findOne({_id:req.body.oid}, function(err,survey){
            for(var i =0, array = survey.measuresTypes; i< array.length;i++){
                var mesure = {title:array[i].title}
                if(req.body[''+array[i].title]){
                    mesure.bulk=req.body[array[i].title];
                }else{
                    mesure.bulk="N/C";
                }
                if(array[i].standard)
                    mesure.standard = array[i].standard;
                rec.addMeasure(mesure);
            }
        });

        res.redirect('/myData');        

    }else{
        console.log('No OID');
        res.redirect('/');  
    }

});
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/myCommunities', function(req, res){
    if(req.session.passport.user){
        Account.find({}, function(err, users){
            res.render("communityMenu", {'users':users});
        });
    }
    else{
        res.redirect('/');       
    }
});

router.get('/myData', function(req, res){
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id}, function(err, surveys){
                res.render('dataDetail', {'surveys': surveys}); 
            });
        });
    }
});
router.post('/myData', function(req, res){
    if(req.body.survey != 'none' && req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Record.find({surveyID:req.body.survey}, function(err, records){
                Survey.find({user:usr._id}, function(err, surveys){
                    for(var i=0;i<surveys.length;i++){
                        if(surveys[i]._id == req.body.survey){
                            selectedSurvey = surveys[i];
                            break;
                        }
                    }
                    res.render('dataDetail', {'surveys': surveys, 'records': records, 'selectedS':selectedSurvey});
                });
            });
        });  
    }
    else{
        res.redirect('/myData');       
    }
});
router.get("/charts", function(req,res){
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id}, function(err, surveys){
                Chart.find({user:usr.id}, {'_id':0, 'survey':1, 'title':1, 'chartType':1, 'yAxisTitle':1, 'xAxisTitle':1}, function(err, charts){
                    console.log(charts);
                    res.render('chartsMenu', {'charts':charts, 'highcharts': true, 'surveys':surveys});
                });
            });
        });
    }
    else{
        res.redirect('/');         
    }
});

router.get("/chartsForm", function(req,res){
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id}, function(err, surveys){
                res.render('chartsForm', {'surveys': surveys, 'usr':usr, 'surveySel':null});
            });
        });
    }
    else{
        res.redirect('/');         
    }
});

//@ A FAIRE pour charget csv
router.get("/toLoad", function(req,res){
    if(req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id, id:"570ac6945112590812572c55"}, function(err, surveys){
                var content = fs.readFileSync("csv/toLoad.csv", 'utf8');
                var lines = content.split("\r\n");

                for(var i =0; i < lines.length-1; i++){
                    var spline = lines[i].split(";");
                    var x  = new Record(JSON.parse(spline[0]));
                    for(var j=1; j < spline.length;j++){
                        x.addMeasure(JSON.parse(spline[j]));

                    }
                    console.log(x);
                }
                res.render('chartsForm', {'surveys': surveys, 'usr':usr, 'surveySel':null});
            });
        });
    }
    else{
        res.redirect('/');         
    }
});
router.post('/chartsForm', function(req, res){
    if(req.body.survey != 'none' && req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            Survey.find({user:usr._id}, function(err, surveys){
                var surveySel ={};
                for(var ind= 0; ind < surveys.length;ind++){
                    if(surveys[ind]._id == req.body.survey){
                        surveySel=surveys[ind];
                    }
                }
                var filter = ["Egal à", "Différent de", "Supérieur à", "Supérieur ou égal à", "Inférieur à", "Inférieur ou égal à","Parmis", "Pas dans"];
                res.render('chartsForm', {'surveys': surveys, 'usr':req.session.passport.user, 'surveySel':surveySel, "filter":filter});
            });
        });
    }
    else{
        res.redirect('/');       
    }
});
/*router.post('/addChart', function(req, res){
    if(req.body.survey != 'none' && req.session.passport.user){
        Account.findOne({username:req.session.passport.user}, function(err, usr){
            var c = new Chart({user:usr._id,
                survey:req.body.surveyID,
                title:req.body.title,
                yAxisTitle:req.body.yAxis,
                xAxisTitle:req.body.xAxis
            })
            console.log(c);
            c.save(function (err, s) {
                if (err) return console.error(err);
                res.redirect('/charts');
            });
        });
    }
    else{
        res.redirect('/');       
    }
});*/

router.post('/loadDataForChart', function(req, res){
    console.log("loadDataForChart => "+req.body[0]);
    Record.find({_id:req.body.chart}, function(err, records){
        if (err) return console.error(err);
        var serie = [];
        for(var i = 0; i < 5;i++){
            //var tmp = [];
            serie[i] = i;
        }
        console.log(serie+" avant envoie");
        res.send(JSON.stringify(serie));
    });
});
module.exports = router;