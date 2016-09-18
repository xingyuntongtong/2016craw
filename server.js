//创建一个服务器，展示保存的数据
var Movie=require('./db');
var express=require('express');
var path=require('path');
var app=express();
//设定html模板的存放路径
app.set('views',path.resolve('views'));
app.set('view engine','html');
app.engine('html',require('ejs').__express);
app.get('/',function(req,res){
    Movie.find().then(function(movies){
        //在Index.html页面中展示出来数据库里面的东西
        res.render('index',{movies});
    }).catch(function(err){
        res.status(500).send(err);//如果错误把错误发回给客户端
    })
});
//就是设置爬虫的抓取时间，看多长时间执行一次 都会存储到数据库中
var CronJob=require('cron').CronJob;
var job=new CronJob('0 */30 * * * *',function(){//每30分钟执行一次
    var child_process=require('child_process');//用子进程不会阻塞服务spawn
    //process.execPath它就是用node 执行这个脚本
    child_process.spawn(process.execPath,['./tasks/main.js']);
});
job.start();


app.listen(9090);











