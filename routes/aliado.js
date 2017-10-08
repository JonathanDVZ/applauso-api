var express = require('express');
var router = express.Router();
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();

var domi = model.dominio;

router.post('/registro-aliado',function(req,res){
	var obj = {
		"code_alia": null,
        "code_usu": req.body.cod_u,
        "nomb_alia": req.body.nomb,
        "desc_alia": req.body.desc,
        "ofre_alia": req.body.ofre,
        "code_cat_alia": req.body.cate,
        "pais_alia": req.body.pais,
        "esta_alia": req.body.esta,
        "ciud_alia": req.body.ciud,
        "zip_cod_alia": req.body.zip,
        "dire_alia": req.body.dire
	};

	var sql = "INSERT INTO aliado SET ?";

	model.ejecutar(sql,obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.code_alia = data.idInsertado;                    
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
		console.log(data);
	});
});

router.post('/editar-aliado',function(req,res){
	
	var obj = {
        "code_usu": req.body.cod_u,
        "nomb_alia": req.body.nomb,
        "desc_alia": req.body.desc,
        "ofre_alia": req.body.ofre,
        "code_cat_alia": req.body.cate,
        "pais_alia": req.body.pais,
        "esta_alia": req.body.esta,
        "ciud_alia": req.body.ciud,
        "zip_cod_alia": req.body.zip,
        "dire_alia": req.body.dire
	};

	var sql = "UPDATE aliado SET ? WHERE code_alia = ?";

    model.ejecutar(sql, [obj,req.body.cod_a], function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filasCambiadas;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
    });
});

router.post('/eliminar-aliado',function(req,res){
	var obj = {};
    model.ejecutar('DELETE FROM aliado WHERE code_alia = ?',[req.query.cod_alia],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Aliado Eliminado';
        }else{
            obj.r = false;
        }
        res.json(obj);
    });
});

router.get('/obtener-aliados', function(req, res){
    model.consulta_multi('SELECT * FROM aliado;', function(data){
    	res.json(data.filas);
    });
});

router.get('/obtener-categorias-aliados', function(req, res){
    model.consulta_multi('SELECT * FROM categorias_aliado CA, aliado A WHERE CA.code_cat_alia=A.code_cat_alia;', function(data){
    	res.json(data.filas);
    });
});

//CATEGORIA
router.post('/registro-categoria',function(req,res){
	var obj = {
		"code_cat_alia":null,
		"nomb_cat_alia":req.body.nom,
		"img_cat_alia":domi+req.body.img,
	};
	model.ejecutar('INSERT INTO categorias_aliado SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.code_cat_alia = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar-categoria',function(req,res){
	
	var obj = {
		"nomb_cat_alia":req.body.nom,
		"img_cat_alia":domi+req.body.img,
	};

    model.ejecutar('UPDATE categorias_aliado SET ? WHERE code_cat_alia = ?',[obj,req.body.cod_cat],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filasCambiadas;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
    });
});

router.post('/eliminar-categoria',function(req,res){
	var obj = {};
    model.ejecutar('DELETE FROM categorias_aliado WHERE code_cat_alia = ?',[req.query.cod_cat],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Categoria Aliado Eliminado';
        }else{
            obj.r = false;
        }
        res.json(obj);
    }); 
});

router.get('/obtener-categorias', function(req, res, next){
    
    var sqlc = "SELECT * FROM categorias_aliado;";
    
    model.consulta_multi(''+sqlc+'', function(data){
    
    res.json(data.filas);
    
    });
});

module.exports = router;
