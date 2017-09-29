var mongoose = require('mongoose');
var Record = require('../models/record');
var Schema = mongoose.Schema;

var measureType = new Schema({
  //Ex: poids
  title: { type: String},
  //Ex: Kilos /!\ Possibilité de le transformé plus tard en tableau ==>voir pour table de conversion
  standard: { type: String},
  //Valeur possible lors d'un cas sémantique ex: les couleurs
  possibleValues:{type:Array},
  //ex: Numeric, chaine de caractère, ...
  type: {type: String},
});

var SurveySchema = new Schema({
  //Proprio de l'enquête
  user: Schema.Types.ObjectId,
  //Date de début de l'enquête
  dateStart: {type: Date},
  //Date de fin de l'enquête
  dateEnd: {type: Date},
  //Titre de l'enquête
  title:{type:String},
  //L'icon de l'enquête (pour le menu)
  icon: {type:String},
  //Les mesures possible pendant l'enquête
  measuresTypes: [measureType],
  //Les mot-clefs de l'enquête
  tags: {type: Array}
});

SurveySchema.methods.dateToString = function(inputFormat){
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

module.exports = mongoose.model('Survey', SurveySchema);