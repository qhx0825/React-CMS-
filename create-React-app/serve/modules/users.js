var mongoose = require('mongoose')


module.exports = mongoose.model('users',new mongoose.Schema({
	username:String,
	password:String,
	password2:String,
	create_time:Number,
	avatar:String,
	role:String
})) 


