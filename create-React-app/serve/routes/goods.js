var express = require('express');
var router = express.Router();
var goodModel = require('../modules/goods.js')
var jwt = require('../uitls/jsonwebtoken.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
//商品新增 编辑
router.post('/good/update',function(req,res){
	//接收入参
	var { name ,img ,price ,desc ,rank ,hot,cate,id} = req.body
	//必填字段校验
	if(!name || !img || !price || !desc || !cate){
		return res.json({
			err:1,
			msg:'存在未填的必填字段'
		})
	}
	var good = {
		name,
		img,
		price,
		cate,
		desc,
		rank:(rank||0),
		hot:(hot||false)
	}
	//有id时修改，无id新增
	if(id){
		goodModel.updateOne({_id:id},{$set:good}).then(()=>{
			res.json({err:0,msg:'修改成功'})
			})
	}else{
		//当新增入库时，才需要create_time字段
		good.create_time = Date.now()
		goodModel.insertMany([good]).then(()=>{
			res.json({err:0,msg:'添加成功'})
		})
		}
})
	//商品删除
	router.get('/good/del',function(req,res){
		//GET  取入参使用 req.query
		//POST 取入参使用 req.body
		var { id } = req.query
		if(!id){
			return res.json({err:1,msg:'输入商品id'})
		}else{
			goodModel.deleteOne({ _id: id}).then(()=>{
				res.json({ err :1, msg: 'success'})
				})
		}
	})
	//商品详情查询
	router.get('/good/detail',function(req,res){
		var { id } = req.query
		if(!id){
			return res.json({err:1,msg:'输入商品id'})
		}else{
			goodModel.find({_id:id}).then(arr=>{
			res.json({
			err:0,msg:'success',data:arr[0]	})
			})
		}
	})
	//查询商品列表
	router.get('/good/list',function(req,res){
		var { size , page , cate , hot } = req.query
		size = parseInt(size || 10)
		page = parseInt(page || 1)
		//check
		var params = {
	// size,
	// page,//数据库中没有这两个参数 这两个参数是用来设置返回值的
			cate:(cate||''),
			hot:(hot||false)
			}
		goodModel.find().count().then(total=>{
			goodModel.find(params).limit(size).skip(size*(page-1)).sort({rank:-1}).then(list=>{
				res.json({err:0,msg:'success',data:{ total, list }})
			})
		})
	})
module.exports = router