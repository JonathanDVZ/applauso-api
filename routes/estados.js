var express = require('express');
var router = express.Router();
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();

router.get('/:idu', function(req, res, next){
    var sql = "select * from estados E, amigos A, usuarios U WHERE (A.id_usuario_e=? OR A.id_usuario_r=?) AND (E.id_usuario=A.id_usuario_e OR E.id_usuario=A.id_usuario_r) AND E.id_usuario=U.id_usuario AND A.estatus=1 ORDER BY fec_est;";
    model.consultar(sql, [req.params.idu, req.params.idu], function(data){
        res.json(data.filas); 
    });
});

router.post('/nuevoEstado', function(req, res, next){

    var txt = req.body.txt;
    var idu = req.body.idu;
    var img = req.body.img;
    var nom = req.body.nom;
    console.log(req.body);

    var objEstado = {
        id_estado: null,
        id_usuario: idu,
        des_est: txt,
        fec_est: new Date(),
    }
    
    var sql = "INSERT INTO estados SET ?";
    model.ejecutar(sql, objEstado, function(data){
        if(data.RESP == "OK"){
            objEstado.id_estado = data.idInsertado;
            objEstado.rsp = true;
            objEstado.img_1 = img;
            objEstado.nom = nom;
            res.io.sockets.emit("recibirEstado", objEstado);
            res.json(objEstado);
        }else{
            objEstado.rsp = false;
            res.json(objEstado);
        }
    });

});

module.exports = router;
