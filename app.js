var express = require('express')
var path = require('path')
var mongoose = require('mongoose')

var port = process.env.PORT || 3000
var app = express()
var dbUrl = "mongodb://127.0.0.1/movie_demo"
mongoose.connect('mongodb://127.0.0.1/movie_demo')
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
	//app.use(express.bodyParser())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
	extended: true
}))

// parse application/json  

//app.use(bodyParser.urlencoded())
//app.use(express.static(path.join(_dirname, 'bower_components')))
app.locals.moment = require('moment')
var serveStatic = require('serve-static')
app.use(serveStatic('public'))
	//app.use(express.cookie)
	//app.user(express.session({
	//secret:'imooc'
	//}))
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions',
	}),
	resave: 'false',
	saveUninitialized: true

}))
if ('development' === app.get('env')) {
	app.set('showStackError', true)
	var morgan = require('morgan')
	var logger = morgan('dev')
	app.use(logger)
	app.locals.pretty = true
	mongoose.set('debug', true)
}

require('./config/routes')(app)
app.listen(port)
console.log('started on port' + port)