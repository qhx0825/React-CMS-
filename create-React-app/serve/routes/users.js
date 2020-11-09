var express = require('express');
var router = express.Router();
var userModel = require('../modules/users.js')
var jwt = require('../uitls/jsonwebtoken.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//获取所有用户列表
router.get('/getList',function(req,res){
	userModel.find({}).then(arr=>{
		res.json({
			err:0,
			msg:'success',
			data:{
				list:arr,
				total:arr.length
			}
			
		})
	})
})

//注册
router.post('/regist',function(req,res){
	//1.接收入参  解构赋值
	var { username,password,password2 } = req.body
	//2.验证入参
	//\~\!\@\#\$\%\^\&\*\.
	if(!/^[a-zA-Z][a-zA-Z0-9]{2,11}$/.test(username)){
		return req.json({
			err:1,
			msg:'用户名格式字母开头，由数字字母组合的3-12位数'
		})
	}
	if(!/^[a-zA-Z][a-zA-Z0-9\~\!\@\#\$\%\^\&\*\.\,\/\[\]]{5,15}$/){
		return res.json({
			err:1,
			msg:'密码格式是字母开头，由数字字母符号组合（不包含空格）的6-16位数'
		})
	}
	if(!username) {
	  return res.json({err: 1, msg: '用户名不能为空'})
	}
	if(!password) {
	  return res.json({err: 1, msg: '密码不能为空'})
	}
	if(!(password===password2)) {
	  return res.json({err: 1, msg: '两次密码不相同'})
	}
	//用户名唯一验证
	userModel.find({ username }).then(arr=>{
		if(arr.length>0){
			return res.json({
				err:1,
				msg:'用户名已存在'})
		}else{
			var user = {
				username,
				password,
				create_time:Date.now()
			}
			userModel.insertMany([user]).then(()=>{
				res.json({
				err:0,
				msg:'注册成功'
				})
			})
		
		}
	})
	
	
})
//登录
router.post('/login',function(req,res){
	var { username, password } = req.body
	userModel.find({username,password}).then(arr=>{
		if(arr.length===1){
			let arg = { username,password }
			let token = jwt.createToken(arg)
			 res.json({
					err:0,
					msg:'success',
					data:{
						token
					},
				}
			 )
		}
	})
})









module.exports = router;
