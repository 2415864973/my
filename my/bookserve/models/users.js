var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        require:true,
        index:{unique:true}
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        index:{unique:true}
    },
    date: { type: Date, default: Date.now() }
});

var UserModel = mongoose.model('users', UserSchema);
UserModel.createIndexes();
//注册
var save = (data)=>{
    var user = new UserModel(data);
    return user.save()
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    });
};
//登录
var findLogin = (data)=>{
    return UserModel.findOne(data);
}
//更新密码
var updatePassword = (email,password)=>{
    return UserModel.update({email},{$set:{password}}).then(()=>{
        return true;
    }).catch(()=>{
        return false;
    });
}
module.exports = {
    save,
    findLogin,
    updatePassword
}