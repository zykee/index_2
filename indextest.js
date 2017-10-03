'use strict';
// const readline = require('readline-sync');
const fs = require("fs");

let word = "";
let arr = [];
let index = 0;
let buf = new Buffer(1024);
let content = ``;

fs.open('_lesson1.txt','r+',function (err,fd) {
    if(err){
        return console.log('open err');
    }
    console.log('open success');
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){
        if(err){
            return console.log('read err');
        }
        console.log(bytes+'字节被读取');
        let regex = /\w+'?\w+/g;//该正则表达式可以用力匹配类似于is或者it's的单词
        word = buf.slice(0,bytes).toString();
        while((arr = regex.exec(word))!=null){
            index++;
            let words = "第"+index+"个"+"=>"+ arr;
            console.log(words);
            content += `第${index}个=>${arr}
`;
        }
        fs.writeFile('result.txt',content);
        fs.close(fd,function (err) {
            if(err){
                console.log(err);
            }
            console.log('close success');
        });
    });
});