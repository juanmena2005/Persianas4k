const express = require('express');


global.app = express();
const port = 3000;


const bodyParser = require("body-parser")


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))


const mongoose = require("mongoose");
const { config } = require('./config.js');

global.nodemailer = require("nodemailer")
global.config = require("./config.js").config
global.sha256 = require('sha256')
global.multer = require("multer")
global.path = require("path")


app.all('*', function(req, res, next) {

  var whitelist = req.headers.origin;
  res.header('Access-Control-Allow-Origin', whitelist);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Credentials", "true");
  // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');


  next();

});

var cors = require('cors')

app.use(cors({
  origin: function(origin, callback){
    console.log(origin)
    if(!origin){
      return callback(null,true)
    }

if(config.listablanca.indexOf(origin) === -1){
  return callback("denegado", false)
}

return callback(null, true)

  }
  
}))

const MongoStore = require("connect-mongo")

var session = require("express-session")({
  secret:config.secretsesion,
  resave:true,
  saveUninitialized:true,
  cookie:{ path:"/", httpOnly:true, maxAge:config.tiemposesion },
  name:config.namecookie,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost/backencookie" })

})
app.use(session)




require("./routes.js")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res)=> {
  console.log("conexion correcga mng")
}).catch((error) =>{
  console.log("error")
})



app.use("/", express.static(__dirname + "/pagina"))
app.use("/servicios", express.static(__dirname + "/servicios"))
app.listen(config.puerto, () => {
  console.log("Servidor en ejecución en el puerto" + config.port);
});