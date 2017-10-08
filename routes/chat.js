var express = require('express');
var router = express.Router();
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();
var pushbots = require('pushbots');


router.get('/noti', function(req, res, next){
    var Pushbots = new pushbots.api({ id:'595ea1f64a9efa3d1f8b4567', secret:'55fa579071eb49c3de8b06a14cd76ec9' });

    Pushbots.setMessage("Hi from new nodeJS API!" ,1);
    Pushbots.customFields({"article_id":"1234"});
    Pushbots.customNotificationTitle("Titulo de la notificacion");
    Pushbots.push(function(response){
            console.log(response);
    });
    res.send("ok");
});


router.post('/grupo/invitar', function(req, res, next){
    var idg = req.body.idg;
    var idu = req.body.idu;

    var objInvitacion = {
        id_asig: null,
        id_grupo: idg,
        id_usuario: idu,
        tipo: 0,
        fecha_asig: new Date(),
    }
    
    console.log(objInvitacion);
    console.log("--");

    var sql = "INSERT INTO asig_usu_grupo SET ?";
    model.ejecutar(sql, objInvitacion, function(data){
        if(data.RESP == "OK"){
            res.io.sockets.emit("miembroGrupo", objInvitacion);
            objInvitacion.rsp = true;
            res.json(objInvitacion);
        }else{
            objInvitacion.rsp = false;
            res.json(objInvitacion);
        }
    });

});

router.post('/grupo/agregar', function(req, res){
    var idg = req.body.idg;
    var ids = req.body.ids;
    
    var sql = "INSERT INTO asig_usu_grupo (id_asig, id_grupo, id_usuario, tipo, fecha_asig) VALUES ?";

    var arr = [];
    for(i = 0; i < ids.length; i++) 
        arr.push([null, idg, ids[i], 0, new Date()]);
    model.ejecutar(sql, [arr], function(data){
        console.log(data);
        res.json(data);
    });

});

router.get('/grupo/:idu/:idg', function(req, res, next){
    var idg = req.params.idg;
    var idu = req.params.idu;

    var sql = "SELECT * FROM chat_grupo C, usuarios U WHERE C.id_usuario=U.id_usuario AND id_grupo=? ORDER BY fecha_enviado;"; 
    model.consultar(sql, [idg], function(data){
        var sql2 = "DELETE FROM ultimo_visto_grupo WHERE id_usuario=? AND id_grupo=?;";
        model.ejecutar(sql2, [idu, idg], function(data2){
            var sql3 = "INSERT INTO ultimo_visto_grupo SET ?;";
            var obj = {
                id_u: null,
                id_grupo: idg,
                id_usuario: idu,
                fecha_visto: new Date()
            }
            model.ejecutar(sql3, obj, function(data3){
                res.json(data.filas); 
            });
        });
    });
});

router.post('/visto/:ide/:idr', function(req, res, next){
    var ide = req.params.ide;
    var idr = req.params.idr;

    sql = "UPDATE chat_privado SET visto=1, fecha_leido=now() WHERE id_usuario_r=? AND id_usuario_e=?;";
    model.ejecutar(sql, [ide, idr], function(data2){
        sql = "SELECT * FROM chat_privado WHERE visto=1 AND id_usuario_r=? AND id_usuario_e=?;";
        model.consultar(sql, [ide, idr], function(data3){
            res.io.sockets.emit("mensajesLeidos", data3.filas);
            res.json(data3.filas); 
        });
    });
});

router.get('/:ide/:idr', function(req, res, next) {

    var ide = req.params.ide;
    var idr = req.params.idr;

    var sql = "SELECT *, U.color FROM chat_privado C, usuarios U WHERE (C.id_usuario_e=? OR C.id_usuario_r=?) AND (C.id_usuario_e=? OR C.id_usuario_r=?) AND C.clear_e=0 AND C.id_usuario_e=U.id_usuario ORDER BY C.fecha_enviado;"; 
    model.consultar(sql, [ide, ide, idr, idr], function(data){
        sql = "UPDATE chat_privado SET visto=1, fecha_leido=now() WHERE id_usuario_r=? AND id_usuario_e=?;";
        model.ejecutar(sql, [ide, idr], function(data2){
            sql = "SELECT *, U.color FROM chat_privado C, usuarios U WHERE C.visto=1 AND C.id_usuario_r=? AND C.id_usuario_e=? AND C.id_usuario_e=U.id_usuario;";
            model.consultar(sql, [ide, idr], function(data3){
                res.io.sockets.emit("mensajesLeidos", data3.filas);
                res.json(data.filas); 
            });
        });
    });

});


router.post('/nuevoMensaje', function(req, res, next){
    var msj = req.body.msj;
    var ide = req.body.ide;
    var idr = req.body.idr;
	var color = req.body.color;
	var tipo_msj = req.body.tipo_msj;
    var objMensaje = {
        id_mensaje_p: null,
        id_usuario_e: ide,
        id_usuario_r: idr,
        clear_e: 0,
        clear_r: 0, 
        mensaje: msj,
        fecha_enviado: new Date(),
        fecha_leido: null,
        visto: 0,
		tipo_msj : tipo_msj,
    }
    
    var sql = "INSERT INTO chat_privado SET ?";
    model.ejecutar(sql, objMensaje, function(data){
        if(data.RESP == "OK"){
            objMensaje.rsp = true;
            objMensaje.id_mensaje_p = data.idInsertado;
			objMensaje.color = color;
            res.io.sockets.emit("recibirMensaje", objMensaje);
            res.json(objMensaje);
        }else{
            objMensaje.rsp = false;
            res.json(objMensaje);
        }
    });
});

router.post('/grupo/nuevoMensaje', function(req, res, next){
    var msj = req.body.msj;
    var ide = req.body.ide;
    var idg = req.body.idg;
	var color = req.body.color;
	var tipo_msj = req.body.tipo_msj;

    var objMensaje = {
        id_mensaje: null,
        id_usuario: ide,
        id_grupo: idg,
        mensaje: msj,
        fecha_enviado: new Date(),
		tipo_msj : tipo_msj,

    }
    
    var sql = "INSERT INTO chat_grupo SET ?";
    model.ejecutar(sql, objMensaje, function(data){
        if(data.RESP == "OK"){
            objMensaje.rsp = true;
            objMensaje.id_mensaje = data.idInsertado;
			objMensaje.color = color;
            res.io.sockets.emit("recibirMensajeGrupo", objMensaje);
            res.json(objMensaje);
        }else{
            objMensaje.rsp = false;
            res.json(objMensaje);
        }
    });
});

module.exports = router;
/*
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();

var tmpSocket = null;
var tmpSockets = null;

exports.setSocket = function(sockets, socket){
    tmpSockets = sockets;
    tmpSocket = socket;
};

exports.obtenerMensajesLobby = function(req, res){
    mMensajeL.find().sort({'_id': -1}).limit(50).exec(function(err, msjs){
        mMensajeL.populate(msjs, {path: "alumno"}, function(err, mensajes){
            res.json(mensajes);
        });
    });
}

exports.obtenerMensajesCurso = function(req, res){
    mMensajeC.find({id_curso: req.session.curso.id_curso}).sort({'_id': -1}).limit(50).exec(function(err, msjs){
        mMensajeC.populate(msjs, {path: "alumno"}, function(err, mensajes){
            res.json(mensajes);
        });
    });
}

exports.chatGeneral = function(req, res){
    var sql = "SELECT * FROM tb_alumnos WHERE tipo_a<>'ADMINISTRADOR' ORDER BY RAND() LIMIT 5;";
    model.consultar(sql, [], function(data){
        mMensaje.find().sort({'_id': -1}).limit(50).exec(function(err, msjs){
            mMensaje.populate(msjs, {path: "usuario"}, function(err, mensajes){
                res.render('index', {
                    opi: "chatgeneral",
                    titulo: 'Chat General de Plade',
                    userS: req.session.usuarioT,
                    msjsS: mensajes,
                    pladeros: data.filas
                });
            });
        });
    });
}

exports.twitterListo = function(req, res){
    mUsuario.findOne({iduser: req.user.profile.id}, function(err, data){
        console.log("INGRESO: "+data);
        if(data){
            req.session.act = true;
            req.session.idc = data._id;
            req.session.usuarioT = data;
            res.redirect("/chat");
            if(data.image != req.user.profile._json.profile_image_url){
                data.update({image: req.user.profile._json.profile_image_url}).exec();
                console.log("Actualizo Imagen twitter");
                req.session.usuarioT.image = req.user.profile._json.profile_image_url;
            }

        }else{
            usuario = new mUsuario({
                iduser: req.user.profile.id,
                username: req.user.profile.username,
                name: req.user.profile.displayName,
                image: req.user.profile._json.profile_image_url
            })
            usuario.save(function(err, r){
                console.log("REGISTRANDO: ",err +" - "+r);
                if(!err){
                    req.session.act = true;
                    req.session.idc = r._id;
                    req.session.usuarioT = r;
                    res.redirect("/chat");
                }else{
                    res.redirect("/");
                }
            });
        }
    });
}

exports.nuevoMensaje = function(req, res){
    var msj = req.body.msj;
    var user = req.body.user;

    console.log("Nuevo Mensaje de: " + user);
    if(msj != "" && user != ""){

        var objMsj = {
            id_mensaje: null,
            mensaje: msj,
            usuario: user,
            fecha: new Date()
        };
        
        model.ejecutar("INSERT INTO mensajes SET ?", objMsj, function(data){
            if(data.RESP == "OK"){
                tmpSocket.broadcast.emit("recibirMensaje", objMsj);
                objMsj.rsp = true;
                res.json(objMsj);
            }else{
                objMsj.rsp = false;
                res.json(objMsj);
            }
        });


    }else{
        
        res.json(null);
    }

}





exports.subirImgChat = function(req, res){
    var id_user_s = req.session.usuario.id_a;
    subir.subirArchivo(req.files.img, 'img-chat', 'imagen', function(data){
        if(data.RESP == 'OK'){
            mensajeC = new mMensajeC({
                texto: "",
                fecha: new Date(),
                id_curso: req.session.curso.id_curso,
                fechaS: fec.fechaActual()+" "+fec.horaActual(),
                img: data.RUTA,
                alumno: req.session.mongo._id,
            });
            mensajeC.save(function(err, dataM){
                console.log(err);
                if(!err){
                    tmpSocket.broadcast.emit("recibirMensajeCurso", {
                        usuario: req.session.mongo,
                        mensajeC: dataM,
                        id_curso: req.session.curso.id_curso
                    });
                }
                if(req.session.usuario.tipo_a == 'ALUMNO')
                    res.redirect('/curso/indexEstudiante');
                else
                    res.redirect('/curso/index');
            });
        }else{
            res.redirect('/curso/index?info=nsimgchat');
        }
    });
}

function twittear(req, twet){
    twet+= " #pladechat";
    if(req.body.env == 'on')
        twet+= " @pladecompany";
    req.app.locals.oa.post(
        "https://api.twitter.com/1.1/statuses/update.json"
        , req.app.locals.userLogueado.token
        , req.app.locals.userLogueado.tokenSecret
        , { "status": twet }
        , function(err, r){
            console.log("TWEET: "+err, r); 
        });
}
*/
