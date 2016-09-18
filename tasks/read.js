
var request=require('request');
var iconv=require('iconv-lite');
var fs=require('fs');
var cheerio=require('cheerio');
//会读取电影列表  Sat, 17 Sep 2016 07:28:35 GMT crawl:read 开始读取电影列表
process.env.DEBUG='crawl:*';
var debug=require('debug')('crawl:read');
/**
 * 读取url中的电影列表并传给callback
 * @param url http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1
 * @param callback 有两个参数，第一个参数错误对象，第二个参数是电影列表
 */
exports.read=function(url,callback){
    //获取数据
    request({
        url,
        encoding:null
    },function(err,response,body){//err错误对象  response响应对象  body响应体
        if(err){
            callback(err);
        }else{
            var result=iconv.decode(body,'gbk');
        //把整个网站添加到这个文件里，它是自动下载下来的 它是临时的，只用一次，不然每次都会出来一个文件
            //fs.writeFile('./movie.html',result);
            var $=cheerio.load(result);//要把上面的结构转为对象形式
            var items=[];
            debug('开始读取电影列表');
            //迭代每一个a标签 把电影名字的列表都得到
            $('.keyword .list-title').each(function(){
                var $me=$(this);
                var item={
                    name:$me.text(),
                    url:$me.attr('href')
                };
    /* 读取到的内容 [{name: '微微一笑很倾城',url: 'http://www.baidu.com/baidu?cl=3&tn=SE_baiduhomet8_jmjb7mjw&fr=top1000&wd=%CE%A2%CE%A2%D2%BB%D0%A6%BA%DC%C7%E3%B3%C7' }],*/
                debug('读到电影'+item.name);
                items.push(item);
            });
            debug('完成读取电影列表');
            callback(err,items);
        }
    })
};

/*exports.read('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function(err,items){
    console.log(items);
});*/











