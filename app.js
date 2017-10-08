var express = require('express');
var mysql = require('mysql');
var config = require("./config");
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MYSQL CONFIGURACION
con = null;
conectar();
var donex = false;
var donex = false;

function conectar(){
    con =  mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements:true,
    });

    con.connect(function(err) {     
        if(err) {   
            console.log('error when connecting to db:', err);
            setTimeout(conectar, 2000); 
        }   
    }); 

    con.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            conectar();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

var index = require('./routes/index');
var usuarios = require('./routes/usuarios');
var eventos = require('./routes/eventos');
var publicidad = require('./routes/publicidad');
var aliado = require('./routes/aliado');

var app = express();
app.io = require('socket.io')();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {

  res.io = app.io;
  next();
});

app.all('*', function(req, res,next) {
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});


/// Rutas de todo el sistema

app.use('/usuario', usuarios);
app.use('/eventos', eventos);
app.use('/publicidad', publicidad);
app.use('/aliado', aliado);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var usuariosC = []; // Usuarios conectados en la app
var io = app.io;

app.io.on('connection', function(socket){  

    socket.on('conecto', function(data){
        if(!buscarConectado(data.idu)){
            console.log("CONECTO USUARIO: " );
            console.log(data);
            socket.id = data.idu;
            usuariosC.push(data);
        }

    });

    socket.on('actualizarLista', function(data){
        console.log("actualizar Listo" + data);
        io.sockets.emit("refrescarLista", data);
    });

    socket.on('compatible', function(data){
        console.log("Solicitud de compatibilidad enviada por: " + data.idue );
        console.log(data);

        console.log("Solicitud de compatibilidad recibida por: " + data.idur );
        io.sockets.emit("recibirInvitacion", data);
    });

    socket.on('asignarGrupo', function(data){
        io.sockets.emit("recibirIdGrupo", data);
    });

    socket.on('enviarSolicitudGrupo', function(data){
        io.sockets.emit("recibirSolicitudGrupo", data);
    });

    socket.on('enviarRespuestaSolicitudGrupo', function(data){
        io.sockets.emit("recibirRespuestaSolicitudGrupo", data);
    });

    socket.on('disconnect', function(){
        console.log("DESCONECTADO");
        desconectar(socket.id);
        //io.sockets.emit('actualizarLista', usuariosC);
        asignarVariables();
    });



    function buscarConectado(id){
        for(i = 0; i  < usuariosC.length ; i++){
            if(usuariosC[i].idu == id) return true;
        }
        return false;
    }

    
    function desconectar(id){
        for(i = 0; i  < usuariosC.length ; i++){
            if(usuariosC[i].id_a == id){
                delete usuariosC[i];
                usuariosC.splice(i, 1);
                return;
            }
        }
    }

    function asignarVariables(){
        //chat.setSocket(io.sockets, socket);
    }
});

module.exports = app;
