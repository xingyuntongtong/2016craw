var Movie=require('../db');
var async=require('async');
var debug=require('debug')('crawl:write');
/**
 * 负责把电影列表保存到mongodb数据库中
 * @param items  电影列表 是一个数组
 * @param callback  任务完成后的回调
 */
exports.write=function(items,callback){
    debug('开始保存电影列表');
    async.forEach(items,function(item,next){
        //先查一下数据库中有没有此名称的电影
        Movie.findOne({name:item.name},function(err,doc){
            debug('保存电影'+item.name);
            if(doc){//如果有，不用在次保存，直接标志此任务完成
                next();
            }else{//如果没有，则保存此电影到数据库中
                Movie.create(item,function(err,newDoc){
                    next();
                })
            }
        })
    },function(err,result){
        debug('保存电影列表完成');
        callback();
    });
    //把数组插进去
    /*Movie.create(items).then(function(docs){
        callback(null,docs);
        debug('结束保存电影列表');
    }).catch(function(err){
        callback(err);
    })*/
};
/*exports.write([{name:'zf',url:'zhfhah'}],function(err,docs){
    console.log(err);
    console.log(docs);
});*/












