const express = require("express")
const router = express.Router()
const pool = require("../pool")

router.post("/comment", (req, res) => {
  var uname =req.session.uname;
  var date = new Date();
  var story = req.body.story;
  
  if(uname){
    var sql1 = "INSERT INTO aby_pinglun values(null,null,?,?,?)";
    var sql2="SELECT * FROM aby_pinglun";
      new Promise(function(open){
        pool.query(sql1, [story, uname, date], (err, result) => {
          if (err) console.log(err);
            if(result.affectedRows>0){
              open("ok")
            }else{
              open("loss")
            } 
        })
        
      }).then(function(msg){
       return new Promise(function(open){
         if(msg=="ok"){
        pool.query(sql2,(err, result) => {
          if (err) console.log(err);

           open(result);
        })
        }else{
          open("loss");
        }
      })
    }).then(function(msg){
      res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      })
      res.write(JSON.stringify({msg:msg}));
      res.end();
    })
  
    
  }else{
    res.write(JSON.stringify({msg:"请登陆后重试"}));
    res.end();
  }
  

})
module.exports = router;