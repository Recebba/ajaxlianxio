const express = require('express');
//引入连接池
const pool = require('../pool.js');
//创建路由器
const r = express.Router();
//添加路由
//1.登录模块
r.get('/v1/login/:uname&:upwd',(req,res)=>{
	var _uname = req.params.uname;
	var _upwd = req.params.upwd;
	pool.query('select * from xz_user where uname = ?and upwd = ?',[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
	
});


//2.用户列表
r.get('/v1/list',(req,res)=>{
	pool.query('select * from xz_user',(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//3.根据uid删除用户
r.delete('/v1/del/:uid',(req,res)=>{
	var _uid = req.params.uid;
	pool.query('delete from xz_user where uid = ?',[_uid],(err,result)=>{
		if (err) throw err;
		// console.log(result);
		if(result.affectedRows > 0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
	
});

//4.根据UID查询用户
r.get('/v1/search/:uid',(req,res)=>{
	var _uid = req.params.uid;
	pool.query('select * from xz_user where uid = ?',[_uid],(err,result)=>{
		if(err) throw err;
		// console.log(result);
		res.send(result);
	});
});



//5.根据uid修改用户信息
r.put('/v1/update',(req,res)=>{
	var obj = req.body;
	pool.query('update xz_user set ? where uid = ?',[obj,obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows > 0){
			res.send('1');
		}else {
			res.send('0');
		}
	});
});
//6.根据uname查询用户（用户名重复验证)
r.get('/v1/getUname/:uname',(req,res)=>{
	var _uname = req.params.uname;
	pool.query('select * from xz_user  where uname = ?',[_uname],(err,result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//7.用户注册
r.post('/v1/reg',(req,res)=>{
	var obj = req.body;
	// console.log(_uname,_upwd);
	pool.query('insert into xz_user set ?',[obj],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows > 0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
	
});

//导出用户路由器
module.exports = r;
