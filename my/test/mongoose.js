var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb collected--')
});
var kittySchema = mongoose.Schema({
    name: String,
    gender:{
        type: String,
        default:'famle'
    }
  });
var Kitten = mongoose.model('Kitten', kittySchema);
Kitten.create({
    name:'手心'
},(err)=>{
    if(!err){
        console.log('插入成功')
    }
})