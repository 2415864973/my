var { Email } = require('../untils/config.js');
var Usermodel = require('../models/users.js');
const jwt = require('../untils/token.js');

//post登录
var login = async (req,res,next)=>{
    var { username , password } = req.body;
    if(!username||!password){
        res.send({
            msg:'请不要发送空数据访问',
            status:-10
        });
    }else{
        var result = await Usermodel.findLogin({username,password});
        if(result){
            req.session.username=username;
            var token = await jwt.createToken(result._id,req.sessionID);
            res.send({
                msg:'登录成功--',
                token:token,
                status:0
            })
        }else{
            res.send({
                msg:'登录失败--',
                status:-1
            })
        }
    }
    
};

//post注册用户
var register = async (req,res,next)=>{
    var { username , password , email , verify } = req.body;
    if(username&&password&&email&&verify){
        if(email !== req.session.email || verify !== req.session.verify){
            res.send({
                msg: '验证失败，请检查邮箱和验证码是否正确',
                statusL:-1
            })
        }else{
            var result = await Usermodel.save({
                username,
                password,
                email
            });
            if(result){
                res.send({
                    msg:'注册成功--',
                    status:0
                });
            }else{
                res.send({
                    msg:'注册失败--',
                    status:-2
                })
            }
        }
    }
};

//logout:get退出登录
var logout = async (req,res,next)=>{
    req.session.username='';
    res.send({
        msg:'退出成功--',
        status:0
    })
};
//verify:get生成验证码
var verify = async (req,res,next)=>{
    var {email} = req.query;
    if(email){
        var verify = Email.verify;
        req.session.verify = verify;
        req.session.email = email;
        Email.transporter.sendMail({
            from: '"book" <2415864973@qq.com>', // sender address
            to: email, // list of receivers
            subject: "book网邮箱验证码", // Subject line
            text: "验证码:"+verify // plain text body
        },
        (err)=>{
            if(err){
                res.send({
                    msg:'验证码发送失败',
                    status:-1
                })
            }else{
                res.send({
                    msg:'验证码已发送',
                    status:0
                })
            }
        });
    }else{
        res.send({
            msg:'邮箱为空--',
            status:-10
        })
    }
    
    
};

//get获取用户信息
var getUser = async (req,res,next)=>{
    var {token} = req.query;
    if(token){
        var result = await jwt.checkToken(token);
        if(result){
            res.send({
                msg:'获取用户信息成功--',
                status:0,
                data:result
            });
        }else{
            res.send({
                msg:'参数非法',
                data:result
            })
        }
    }else{
        res.send({
            msg:'缺少必要参数--',
            status:-1
        });
    }
};

//post找回密码
var findPassword = async (req,res,next)=>{
    var { email , password , verify } = req.body;
    if( email === req.session.email && verify === req.session.verify){
        var result = await Usermodel.updatePassword(email,password);
        if(result){
            res.send({
                msg:'修改成功--',
                status:0
            })
        }else{
            res.send({
                msg:'修改失败--',
                status:-2
            })
        }
    }else{
        res.send({
            msg : '验证码有错--',
            status:-1
        })
    }
};

module.exports = {
    login,
    register,
    logout,
    verify,
    getUser,
    findPassword
}