var jwt = require('jsonwebtoken')


function createToken(data){
 return jwt.sign({
	exp:Math.floor(Date.now()/1000)+(60 * 60 * 24 * 7),
	data,
},'qf')
}


function verifyToken(token){
	return new Promise(function(resolv,reject){
		try{
			var decoded = jwt.verify(token,'qf')
			resolve(decoded.data)
		}catch(err){
			reject(err)
		}
	})
	
}
module.exports = {
	createToken,
	verifyToken
}
