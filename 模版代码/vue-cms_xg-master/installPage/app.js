let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');
const config = require("./utils/config.js")
console.log("http://localhost:"+config.port)
const session = require('express-session')
let index = require('./routes');
const http = require("http");
let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  // 指定模板引擎ejs

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000*30*60 //*过期时间*/
  },
  rolling:true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  name: 'ivan'
}))
app.use(formidableMiddleware());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源

app.use('/', index);

// 错误处理要放在最后
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');  // render：将error.ejs渲染到浏览器
});
app.set('port', config.port);
let server = http.createServer(app);
server.listen(config.port,()=>{
  console.log("http://localhost:"+config.port)
});

