var fs = require('fs');
var cutBook = (bookNmae,outPath,inputPath)=>{
    if(!outPath){outPath='./book/'}
    if(!inputPath){inputPath='./book/'}
    var from=inputPath+bookNmae;
    var wholePath=outPath+bookNmae;
    if(!fs.existsSync(wholePath)){
        fs.mkdirSync(wholePath);
    }
    fs.readFile(from+'.txt',{encoding:'utf8'}, (err, data) => {
        if (err) throw err;
        var ptt=/第([零一二三四五六七八九十百千万]|[0-9])+章(?=\s).+\r\n/g;
        var last = '';
        while(data){
            try {
                var str = ptt.exec(data);
                if(last.split('章')[0]!==str[0].split('章')[0]){
                    fs.appendFileSync(wholePath+'/目录.txt',str[0]);
                }
                last=str[0];
            } catch (error) {
                break;
            }
        }
        var jet =/-{10,}\r\n/;
        var dataSec = data.split(jet);
        var lo=1;
        if(fs.existsSync(wholePath)){
            for(var k=2;k<dataSec.length;k++,lo++){
                fs.writeFileSync(wholePath+'/'+lo+'.txt',dataSec[k],{encoding:'utf8'});
            }
        }else{
            fs.mkdirSync(wholePath);
            for(var k=2;k<dataSec.length;k++,lo++){
                fs.writeFileSync(wholePath+'/'+lo+'.txt',dataSec[k],{encoding:'utf8'});
            }
        }
    });
}
module.exports={
    cutBook
}