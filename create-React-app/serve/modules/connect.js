var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/qf2006',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

var connection = mongoose.connection

connection.on('error',console.error.bind(console,'connection error:'));
connection.once('open',function(){
	console.log("Connection is success")
})


