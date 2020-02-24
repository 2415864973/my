res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
res.header("X-Powered-By", ' 3.2.1');
    //这段仅仅为了方便返回json而已
res.header("Content-Type", "application/json;charset=utf-8");
console.log('cors设置---');