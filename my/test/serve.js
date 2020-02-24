var express = require('express');
var fs = require('fs');
var app = express();
//require('./tools/test');
console.log('服务启动');
app.get('/index',(req,res)=>{
    console.log(req.query);
    res.send('index.html');
})
app.get('/', function(req, res){
  res.send('hello world');
});
app.get('/api/home',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
      //这段仅仅为了方便返回json而已
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log(req.query);
  var path = './public/book/001.txt';
  var path2 = './public/book';
  var text=fs.readFileSync(path,{encoding:'utf8'});
  var files=fs.readdir(path2,{encoding:'utf8'},(err,files)=>{
    console.log(files);
    res.send({
      bookList:[
        {
          name:'遮天',
          bookId:files[0].split('.')[0],
          bookImg:'./public/images/book.jpg',
          book:text
        }
      ]
    })
  });
  console.log(text);
  console.log("-------------------");
})

app.listen(3000);