var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();
var date = new Date;
var domi = model.dominio;

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/usuarios');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});
var upload = multer({ storage : storage}).single('img');

//USUARIOS
router.post('/subir-imagen',function(req,res){
    var obj = {};
    upload(req,res,function(err) {
        if(err){
            obj.r = false;
            obj.msj = "Error al subir el archivo. "+err;
            return res.json(obj);
        }
        console.log(req.body);
        console.log(req.file);

        var nom_img = domi+'public/usuarios/'+req.file.filename;

        model.ejecutar('UPDATE usuarios SET imag_usu = ? WHERE code_usu = ?',[nom_img,req.body.id],function(data){
            if(data.RESP == "OK"){
                obj.r = true;
                obj.msj = "Imagen Actualizada";
                obj.img = nom_img;
            }else{
                obj.r = false;                
                obj.msj = data.RESP;
            }
            res.json(obj);
        });
    });
});


router.post('/login', function(req, res, next){

    var usu = req.body.usu;
    var pas = req.body.pas;

    var sql = "SELECT * FROM usuarios WHERE corr_usu=? AND pass_usu=MD5(?);";

    model.consultar(sql, [usu, pas], function(data){
        if(data.nFilas == 1){
            var usuario = data.fila;
            usuario.r = true;
        }else{
            var usuario = {};
            usuario.msj = 'Usuario ó Contraseña Incorrecto';
            usuario.r = false;
        }
        res.json(usuario);
    });
});

router.post('/login-oauth', function(req, res, next){

    var usu = req.body.usu;

    var sql = "SELECT * FROM usuarios WHERE corr_usu = ?;";

    model.consultar(sql, [usu], function(data){
        if(data.nFilas == 1){
            var usuario = data.fila;
            usuario.r = true;
        }else{
            var usuario = {};
            usuario.r = false;
        }
        res.json(usuario);
    });
});

router.post('/registro', function(req, res, next){

    var obj = {
        "code_usu": null,
        "nomb_usu": req.body.nom,
        "apel_usu": req.body.ape,
        // "fech_nac_usu": req.body.fec,
        // "iden_usu": req.body.idu,
        "corr_usu": req.body.cor,
        "pass_usu": req.body.pas,
        // "telf_usu": req.body.tlf,
        // "ocupacion": req.body.ocu,
        // "empresa": req.body.emp,
        // "sexo_usu": req.body.sex,
        // "mani_usu": null,
        // "code_pai": req.body.pai,
        // "ciud_usu": req.body.ciu,
        // "tipo_usu": req.body.tip,
        "imag_usu": domi,
        "fech_reg_usu": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
        // "sald_usu": null,
        // "appl_usu": null,
    }

    var sql = "INSERT INTO usuarios SET ?";

    model.ejecutar(sql, obj, function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.code_usu = data.idInsertado;
            model.ejecutar('UPDATE usuarios SET pass_usu=MD5('+obj.pass_usu+') WHERE code_usu=?;',[''+data.idInsertado+''],function(data){});
            
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
    });
    console.log(obj);
});

router.post('/editar', function(req, res, next){

    var obj = {
        "nomb_usu": req.body.nom,
        "apel_usu": req.body.ape,
        "fech_nac_usu": req.body.fec,
        "iden_usu": req.body.idu,
        "corr_usu": req.body.cor,
        "telf_usu": req.body.tlf,
        "emp_usu": null,
        "ocupa_usu": null,
        "sexo_usu": req.body.sex,
        "mani_usu": null,
        "code_pai": req.body.pai,
        "ciud_usu": req.body.ciu,
        "tipo_usu": null,
        "sald_usu": null,
        "appl_usu": null,
    }

    var sql = "UPDATE usuarios SET ? WHERE code_usu = ?";

    model.ejecutar(sql, [obj,req.body.cod], function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filasCambiadas;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "No se Modifico ningun dato";
        }
        res.json(obj);
    });
});

router.post('/editar_pass',function(req,res,next){
    var obj = {};

    var sql = "UPDATE usuarios SET pass_usu = MD5(?) WHERE pass_usu = MD5(?) AND code_usu = ?";
    
    model.ejecutar(sql,[req.body.rep_pas,req.body.act_pas,req.body.cod],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filasCambiadas;
            obj.msj = "Contraseña Cambiada";
        }else if(data.RESP == "NO"){
            obj.r = false;
            obj.msj = "No se Modifico la Contraseña";
        }
        res.json(obj);
    });
    console.log(obj);
});

router.get('/obtener-usuario',function(req,res,next){
    var obj = {};
    model.consultar('SELECT * FROM usuarios WHERE code_usu = ?',[req.query.code_usu],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.data = data.fila;
        }else{
            obj.r = false;
            obj.msj = 'No Exite un Registro';
        }
        res.json(obj);
    });
});

router.get('/obtener-listado-usuarios', function(req, res, next){
    model.consulta_multi('SELECT * FROM usuarios', function(data){
        res.json(data.filas);
    });
});

//PAISES
router.get('/obtener-paises', function(req, res, next){
    var obj = {};
    model.consultar('SELECT * FROM paises',[],function(data){
        obj.data = data.filas
        res.json(obj);
    });
});

//TARJETAS
router.post('/agregar_tarjeta', function(req,res,next){
    var obj = {
        "code_tar": null,
        "code_usu": req.body.cod_u,
        "nume_tar": req.body.num,
        "venc_tar": req.body.ven,
        "cvv_tar": req.body.cvv,
        "nomb_tar": req.body.nom,
        "tipo_tar": req.body.tip
    };

    var sql = "INSERT INTO tdcs SET ?";

    var date = new Date();
    var a = date.getFullYear();
    var ma = date.getMonth()+1;

    var aa = a.toString().substring(2,4);

    var date_tar = obj.venc_tar.split(' / ');
    var m_tar = date_tar[0];
    var a_tar = date_tar[1];

    if(a_tar<aa){
        obj.r = false;
        obj.msj = 'El Año de Vencimiento debe Ser Mayor Al Actual '+aa;
        res.json(obj);
    }else{
        if(a_tar==aa && m_tar<=ma){
            obj.r = false;
            obj.msj = 'El Mes de Vencimiento debe Ser Mayor Al Actual '+ma;
            res.json(obj);
            console.log(obj);
        }else{
            model.ejecutar(sql, obj, function(data){
                if(data.RESP == "OK"){
                    obj.r = true;
                    obj.code_tar = data.idInsertado;                    
                }else if(data.RESP == "DUPLICADO"){
                    obj.r = false;
                    obj.msj = "Ya Posees una Tarjeta con los Datos Ingresados";
                }
                res.json(obj);
            });
        }
    }
});

router.post('/editar_tarjeta',function(req,res,next){
    var obj = {
        "nume_tar": req.body.num,
        "venc_tar": req.body.ven,
        "cvv_tar": req.body.cvv,
        "nomb_tar": req.body.nom,
        "tipo_tar": req.body.tip
    };

    var sql = "UPDATE tdcs SET ? WHERE code_tar = ?";

    var date = new Date();
    var a = date.getFullYear();
    var ma = date.getMonth()+1;

    var aa = a.toString().substring(2,4);

    var date_tar = obj.venc_tar.split(' / ');
    var m_tar = date_tar[0];
    var a_tar = date_tar[1];

    if(a_tar<aa){
        obj.r = false;
        obj.msj = 'El Año de Vencimiento debe Ser Mayor Al Actual '+aa;
        res.json(obj);
    }else{
        if(a_tar==aa && m_tar<=ma){
            obj.r = false;
            obj.msj = 'El Mes de Vencimiento debe Ser Mayor Al Actual '+ma;
            res.json(obj);
            console.log(obj);
        }else{
            model.ejecutar(sql, [obj,req.body.cod], function(data){
                if(data.RESP == "OK"){
                    obj.r = true;
                    obj.msj = "Cambios Guardados";
                    obj.code_tar = req.body.cod;
                }else if(data.RESP == "NO"){
                    obj.r = false;
                    obj.msj = "No se Guardaron los Cambios";
                }
                res.json(obj);
            });
        }
    }
});

router.get('/obtener-tarjetas',function(req,res,next){
    model.consultar('SELECT * FROM tdcs WHERE code_usu = ?',[req.query.cod_usu],function(data){
        var obj = {};
        if(data.RESP=='OK'){
            obj.r = true;
            obj.data = data.filas;
        }else{
            obj.r = false;            
        }
        res.json(obj);
    });
});

router.get('/obtener-tarjeta',function(req,res,next){
    model.consultar('SELECT * FROM tdcs WHERE code_tar = ?',[req.query.code_tar],function(data){
        var obj = {};
        if(data.RESP=='OK'){
            obj.r = true;
            obj.data = data.filas;
        }else{
            obj.r = false;            
        }
        res.json(obj);
    });
});

router.post('/eliminar-tarjeta',function(req,res,next){
    var obj = {};
    model.ejecutar('DELETE FROM tdcs WHERE code_tar = ?',[req.query.cod_tar],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Tarjeta Elimina';
        }else{
            obj.r = false;
        }
        res.json(obj);
    }); 
});

module.exports = router;