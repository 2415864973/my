var mongoose = require('mongoose');
var Mongoose = {
    url: 'mongodb://127.0.0.1/test',
    connect(){
        mongoose.connect(this.url,(err)=>{
            if(err){
                console.log('数据库连接失败--');
                return;
            }
            console.log('数据库连接成功--')
        })
    }
}
module.exports = {
    Mongoose
}