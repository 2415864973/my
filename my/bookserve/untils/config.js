var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var Mongoose = {
    url: 'mongodb://127.0.0.1/book',
    connect(){
        mongoose.connect(this.url,{ useNewUrlParser: true },(err)=>{
            if(err){
                console.log('数据连接失败--');
                return;
            }
            console.log('数据库连接成功--');
        });
    }
}

var Email = {
    config : {
        host: "smtp.qq.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: '2415864973@qq.com', // generated ethereal user
        pass: 'pvafcqbhvcyreaif' // generated ethereal password
        }
    },
    get transporter (){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    }
}

module.exports = {
    Mongoose,
    Email
}