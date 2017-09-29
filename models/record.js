var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Measure = new Schema({
    bulk: {type:String},
    standard:{type:String},
    title:{type:String} //La grande question: un champs label de type string ou un champs "tags" de type array de string?
});

var RecordSchema = new Schema({
    tags:{type:Array},
    surveyID: Schema.Types.ObjectId,
    title:{type:String},
    measures: [Measure]
});

RecordSchema.methods.addMeasure = function(measure){
    this.measures.push(measure);
    //console.log("After call to push: "+this);
    console.log(this);
    this.save(function(err){
        if(err){
            return err;
        }else{
            console.log("Enregistrement de la mesure, ... : OK");
        }
    })
}
module.exports = mongoose.model('Record', RecordSchema);