var express = require('express');
var router = express.Router();
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();

/* GET home page. */
router.post('/procesar', function(req, res, next) {

    var objAmigos = {
        id_a: null,
        id_usuario_e: req.body.idue,
        id_usuario_r: req.body.idur,
        fecha_amistad: new Date(),
        estatus: 1
    }
    if(req.body.resp == 2){ // 2 es igual aa que no acepto, valor viene de cliente spinckly.
        res.io.sockets.emit("rechazoInvitacion", objAmigos);
    }else{
        var sql = "SELECT * FROM amigos WHERE ((id_usuario_e=? AND id_usuario_r=?) OR (id_usuario_e=? AND id_usuario_r=?)) AND estatus=1;";
        model.consultar(sql, [objAmigos.id_usuario_e, objAmigos.id_usuario_r, objAmigos.id_usuario_r, objAmigos.id_usuario_e], function(data1){
            if(data1.nFilas == 1){
                res.io.sockets.emit("aceptoInvitacion", objAmigos);
                res.json({r: true});
            }else{
                var sql = "INSERT INTO amigos SET ?";
                model.ejecutar(sql, objAmigos, function(data){
                    if(data.RESP == "DUPLICADO"){
                        res.json({r: false});
                    }else if(data.RESP == "OK"){
                        res.io.sockets.emit("aceptoInvitacion", objAmigos);
                        res.json({r: true});
                    }
                });
            }
        });
    }
});

router.get('/amigos/:ide/:idr', function(req, res, next){
    var ide = req.params.ide;
    var idr = req.params.idr;

        var sql = "SELECT * FROM amigos WHERE ((id_usuario_e=? AND id_usuario_r=?) OR (id_usuario_e=? AND id_usuario_r=?)) AND estatus=1;";
        model.consultar(sql, [ide, idr, idr, ide], function(data1){
            if(data1.nFilas == 1)
                res.json({r: true});
            else
                res.json({r: false});
        });
});

module.exports = router;
