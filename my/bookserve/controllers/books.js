var BookMoudle = require('../models/books.js');
var fs = require('fs');

//get
var getBookList = async (req,res,next)=>{
    var {classification,bookName} = req.query;
    fs.readFile('./public/text/test.txt',{encoding:'utf8'},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data)
            res.send({
                msg:'ok',
                txt:data
            })
        }

    })
    /* var data = req.data;
    if(data){
        var resualt = await BookMoudle.getBookList(data);
    } */
}

//get
var getBook = async (req,res,next)=>{
    var {bookName,page} = req.query;
    var data = {bookName}
    if(!page)page=0;
    var result = await BookMoudle.getBook(data);
    if(result){
        fs.readFile(result.dataUrl[page-1].url,{encoding:'utf8'},(err,data)=>{
            if(err){
                res.send({
                    msg:'the file is no found--',
                    status:-3
                })
            }else{
                res.send('<pre>'+data+'</pre>')
            }
        })
    }else{
        res.send({
            msg:'失败--',
            status:-2,
        })
    }
}

//post
var saveBook = async (req,res,next)=>{
        var {bookName,bookTitleImg,bookInfo,otherImg,classification,dataUrl,token}=req.body;
        if(token==='123456789'){
            var data={bookName,bookTitleImg,bookInfo,otherImg,classification,dataUrl};
            var result = await BookMoudle.save(data);
            if(result){
                res.send({
                    msg:'添加成功--',
                    status:0
                })
            }else{
                res.send({
                    msg:'添加失败--',
                    status:-2
                })
            }  
        }else{
            res.send({
                msg:'token错误--',
                status:-100
            })
        }
}

//get
var getImg = async (req,res,next)=>{
    var {params} = req;
    res.send({
        msg:'ok'
    })
}

module.exports = {
    getBookList,
    saveBook,
    getBook,
    getImg
}