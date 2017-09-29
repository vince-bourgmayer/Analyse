var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartSchema = new Schema({
    user: {type:String},
    survey:{type:String},
    title: {type:String},
    chartType: {type:String},
    yAxisTitle: {type:String},
    xAxisTitle: {type:String}
    });

module.exports = mongoose.model('Chart', ChartSchema);