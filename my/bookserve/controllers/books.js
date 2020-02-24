var BookMoudle = require('../models/books.js');

var bookList = async (req,res,next)=>{
    res.send({
        msg:'ok',
        status:0
    })
}

module.exports = {
    bookList
}