var express = require('express');
var router = express.Router();
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();

var domi = model.dominio;

/*PUBLICIDAD*/
router.post('/registro',function(req,res,next){
	var obj = {
		'cod_publ':null,
		'code_usu':req.body.code_usu,
		'code_cat_publ':req.body.code_cat_publ,
		'code_tip_publ':req.body.code_tip_publ,
		'nomb_camp':req.body.nomb_camp,
		'desc_camp':req.body.desc_camp,
		'enca_publ':req.body.enca_publ,
		'land_page_publ':req.body.land_page_publ,
		'pais_publ':req.body.pais_publ,
		'esta_publ':req.body.esta_publ,
		'ciud_publ':req.body.ciud_publ,
		'zip_cod_publ':req.body.zip_cod_publ,
		'dire_publ':req.body.dire_publ,
		'empr_publ':req.body.empr_publ,
		'desc_empr_publ':req.body.desc_empr_publ,
		'nomb_enca_publ':req.body.nomb_enca_publ,
		'tlf_enca_publ':req.body.tlf_enca_publ,
		'face_publ':req.body.face_publ,
		'inst_publ':req.body.inst_publ,
		'twit_publ':req.body.twit_publ,
		'fecha_ini_publ':req.body.fecha_ini_publ,
		'fecha_fin_publ':req.body.fecha_fin_publ
	}
    model.ejecutar('INSERT INTO publicidad SET ?', obj, function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.cod_publ = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
    });
});

router.post('/editar',function(req,res,next){
	var obj = {
		'code_usu':req.body.code_usu,
		'code_cat_publ':req.body.code_cat_publ,
		'code_tip_publ':req.body.code_tip_publ,
		'nomb_camp':req.body.nomb_camp,
		'desc_camp':req.body.desc_camp,
		'enca_publ':req.body.enca_publ,
		'land_page_publ':req.body.land_page_publ,
		'pais_publ':req.body.pais_publ,
		'esta_publ':req.body.esta_publ,
		'ciud_publ':req.body.ciud_publ,
		'zip_cod_publ':req.body.zip_cod_publ,
		'dire_publ':req.body.dire_publ,
		'empr_publ':req.body.empr_publ,
		'desc_empr_publ':req.body.desc_empr_publ,
		'nomb_enca_publ':req.body.nomb_enca_publ,
		'tlf_enca_publ':req.body.tlf_enca_publ,
		'face_publ':req.body.face_publ,
		'inst_publ':req.body.inst_publ,
		'twit_publ':req.body.twit_publ,
		'fecha_ini_publ':req.body.fecha_ini_publ,
		'fecha_fin_publ':req.body.fecha_fin_publ
	}
    model.ejecutar('UPDATE publicidad SET ? WHERE cod_publ = ?', [obj,req.body.cod_publ], function(data){
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

router.post('/eliminar',function(req,res,next){
	var obj = {};
    model.ejecutar('DELETE FROM publicidad WHERE cod_publ = ?',[req.query.cod_publ],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Publicidad Eliminada';
        }else{
            obj.r = false;
        }
        res.json(obj);
    });
});

router.get('/obtener-publicidades',function(req,res,next){
	model.consulta_multi('SELECT * FROM publicidad;', function(data){        
        res.json(data.filas);
    });
});

router.get('/obtener-publicidad',function(req,res,next){
	model.consulta_multi('SELECT * FROM publicidad WHERE cod_publ='+req.query.cod_publ+';', function(data){        
        res.json(data.filas);
    });
});

/*PUBLICIDAD EN EVENTOS*/
router.post('/registrar-publi-evento',function(req,res,next){
	var obj = {
		'code_pu_eve':null,
		'code_publ':req.body.code_publ,
		'code_eve':req.body.code_eve
	};
	model.ejecutar('INSERT INTO publicidad_en_eventos SET ?', obj, function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.code_pu_eve = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
    });
});

router.post('/editar-publi-evento',function(req,res,next){
	var obj = {
		'code_publ':req.body.code_publ,
		'code_eve':req.body.code_eve
	};
	model.ejecutar('UPDATE publicidad_en_eventos SET ? WHERE code_pu_eve = ?', [obj,req.body.code_pu_eve], function(data){
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

router.post('/eliminar-publi-evento',function(req,res,next){
	var obj = {};
    model.ejecutar('DELETE FROM publicidad_en_eventos WHERE code_pu_eve = ?',[req.query.code_pu_eve],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Publicidad Eliminada del Evento';
        }else{
            obj.r = false;
        }
        res.json(obj);
    });
});
/*CATEGORIAS DE PUBLICIDAD*/
router.post('/registrar-cat-publicidad',function(req,res,next){
	var obj = {
		'cod_cat_publ':null,
		'nomb_cat_publ':req.body.nomb_cat_publ,
		'img_cat_publ':domi+req.body.img_cat_publ
	};
	model.ejecutar('INSERT INTO categorias_publicidad SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.cod_cat_publ = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar-cat-publicidad',function(req,res,next){
	var obj = {
		'nomb_cat_publ':req.body.nomb_cat_publ,
		'img_cat_publ':domi+req.body.img_cat_publ
	};
	model.ejecutar('UPDATE categorias_publicidad SET ? WHERE cod_cat_publ = ?',[obj,req.body.cod_cat_publ],function(data){
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

router.post('/eliminar-cat-publicidad',function(req,res,next){
	var obj = {};
    model.ejecutar('DELETE FROM categorias_publicidad WHERE cod_cat_publ = ?',[req.query.cod_cat_publ],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Cateogria de Publicidad Eliminada';
        }else{
            obj.r = false;
        }
        res.json(obj);
    });
});

router.get('/obtener-categorias',function(req,res){
    model.consulta_multi('SELECT * FROM categorias_publicidad;', function(data){        
        res.json(data.filas);
    });
});

router.get('/obtener-categoria',function(req,res){
    model.consulta_multi('SELECT * FROM categorias_publicidad WHERE cod_cat_publ = '+req.query.cod_cat_publ+'', function(data){        
        res.json(data.filas);
    });
});
/*TIPOS DE PUBLICIDAD*/
router.post('/registrar-tip-publicidad',function(req,res,next){
	var obj = {
		'cod_tip_publ':null,
		'nomb_tip_publ':req.body.nomb_tip_publ,
		'img_tip_publ':domi+req.body.img_tip_publ
	};
	model.ejecutar('INSERT INTO tipos_de_publicidad SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.cod_tip_publ = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar-tip-publicidad',function(req,res,next){
	var obj = {
		'nomb_tip_publ':req.body.nomb_tip_publ,
		'img_tip_publ':domi+req.body.img_tip_publ
	};
	model.ejecutar('UPDATE tipos_de_publicidad SET ? WHERE cod_tip_publ = ?',[obj,req.body.cod_tip_publ],function(data){
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

router.post('/eliminar-tip-publicidad',function(req,res,next){
	var obj = {};
    model.ejecutar('DELETE FROM tipos_de_publicidad WHERE cod_tip_publ = ?',[req.query.cod_tip_publ],function(data){
        if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Cateogria de Publicidad Eliminada';
        }else{
            obj.r = false;
        }
        res.json(obj);
    });
});

router.get('/obtener-tipos-cat',function(req,res){
    model.consulta_multi('SELECT * FROM tipos_de_publicidad;', function(data){        
        res.json(data.filas);
    });
});

router.get('/obtener-tipo-cat',function(req,res){
    model.consulta_multi('SELECT * FROM tipos_de_publicidad WHERE cod_tip_publ = '+req.query.cod_tip_publ+'', function(data){        
        res.json(data.filas);
    });
});

router.get('/obtener-categorias-y-tipos', function(req, res, next){
    var sqlc = "SELECT * FROM categorias_publicidad;";
    var sqlt = "SELECT * FROM tipos_de_publicidad";
    model.consulta_multi(''+sqlc+' '+sqlt+'', function(data){
    	res.json({categorias_publicidad: data.filas[0],tipos_de_publicidad:data.filas[1]});
    });
});

module.exports = router;