var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    bookname:{
        type:String,
        require:true,
        index:{unique:true}
    },
    mainUrl:{
        type:String,
        default:'s',
    },
    class:{
        type:String,
        default:'IT'
    }
});


module.exports = {
    
}