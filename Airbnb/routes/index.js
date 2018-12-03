const express = require('express');
const router = express.Router();
const pool = require("../pool.js");


// router.get('/index',(req,res)=>{
// var obj=req.query;console.log(1111)
// //var $cityid=parseInt(obj.cityid);
//     var sql='select * from aby_houseDetails ';
//     pool.query(sql,[],(err,result)=>{ 
//         if(err) throw err;
//         res.write(JSON.stringify(result));
       
//         res.end();
//     })
// })
// module.exports=router;
router.get("/getIndex",(req,res)=>{
    var obj=req.query;
    console.log(1111)
    var cityid=obj.cityid;
    var sql="select * from aby_houseDetails where cityid=?";
    pool.query(sql,[cityid],(err,result)=>{
        
        if(err) console.log(err);
        //跨域不能send
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",   //传输json数据，防治中文乱码  
            "Access-Control-Allow-Origin":"*"   //允许发送跨域请求*，*是可以允许任意来源
        })
        //可以向客户端写内容
        res.write(JSON.stringify(result));   //json对象转json字符串
        res.end();   //结束并发送响应
    })
})
module.exports=router;