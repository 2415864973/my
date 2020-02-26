var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    bookName:{
        type:String,
        require:true,
        index:{unique:true}
    },
    bookTitleImg:{
        type:String,
        default:'../public/images/test.jpg',
    },
    bookInfo:{
        type:String,
        default:'暂无描述--'
    },
    otherImg:{
        type:Array,
        default:[]
    },
    classification:{
        type:String,
        default:'无'
    },
    dataUrl:{
        type:Array,
        default:[{page:'1',url:'./book/遮天/1.txt'}]
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
var BookModel = mongoose.model('books', BookSchema);
BookModel.createIndexes();
//上传book
var save = (data)=>{
    var book = new BookModel(data);
    return book.save()
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    });
};
//getBookList
var getBookList = (data)=>{
    return BookModel.find(data);
}

var getBook = (data)=>{
    return BookModel.findOne(data);
}
module.exports = {
    save,
    getBookList,
    getBook
}