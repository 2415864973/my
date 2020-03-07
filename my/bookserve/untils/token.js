const jwt = require('jsonwebtoken');
const scrict = '!~~##nxujnx8489~23'

var createToken = (uid,sessionID,exp)=>{
    if(!exp)exp=1000*60*60*24;
    var ctime = Date.now();
    exp = exp+ctime;
    var payload = {
        uid:uid,
        sessionID:sessionID,
        exp:exp,
        iat:ctime
    }
    return jwt.sign(payload,scrict);
}

var checkToken = (token)=>{
    return jwt.verify(token,scrict,(err,data)=>{
            if(err){return false}else{return data}    
            });
}
module.exports = {
    createToken,
    checkToken
}
