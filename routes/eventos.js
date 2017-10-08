var express = require('express');
var router = express.Router();
var modelo = require('./modelo');
var model = new modelo();
var fechas = require('./fechas');
fec = new fechas();

var domi = model.dominio;

/*EVENTOS*/
router.post('/registro',function(req,res){
	var obj = {
		"code_eve":null,
		"code_usu":req.body.cod_u,
		"code_cat_eve":req.body.cod_cat,
		"code_tipo_eve":req.body.cod_tip,
		"priv_eve":req.body.priv,
		"nomb_eve":req.body.nom,
		"desc_eve":req.body.des,
		"esta_eve":req.body.est,
		"lati_eve":req.body.lat,
		"long_eve":req.body.lon,
		"rest_eda_eve":req.body.res,
		"term_cond_eve":req.body.ter,
		"fecha_ini_eve":req.body.ini,
		"fecha_fin_eve":req.body.fin,
	};

	model.ejecutar('INSERT INTO eventos SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.code_eve = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar',function(req,res){
	var obj = {
		"code_usu":req.body.cod_u,
		"code_cat_eve":req.body.cod_cat,
		"code_tipo_eve":req.body.cod_tip,
		"priv_eve":req.body.priv,
		"nomb_eve":req.body.nom,
		"desc_eve":req.body.des,
		"esta_eve":req.body.est,
		"lati_eve":req.body.lat,
		"long_eve":req.body.lon,
		"rest_eda_eve":req.body.res,
		"term_cond_eve":req.body.ter,
		"fecha_ini_eve":req.body.ini,
		"fecha_fin_eve":req.body.fin,
	};

	model.ejecutar('UPDATE eventos SET ? WHERE code_eve = ?',[obj,req.body.code_eve],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filaCambiada;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/eliminar',function(req,res,next){
	var obj = {};
	model.ejecutar('DELETE FROM eventos WHERE code_eve = ?',[req.query.code_eve],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Evento Eliminado';
        }else{
            obj.r = false;
        }
        res.json(obj);
	});
});

router.get('/obtener-evento', function(req, res, next){
    model.consulta_multi('SELECT * FROM eventos WHERE code_eve = '+req.query.code_eve+';', function(data){
    	res.json(data.filas);
    });
});

router.get('/obtener-eventos', function(req, res, next){
    model.consulta_multi('SELECT * FROM eventos;', function(data){
    	res.json(data.filas);
    });
});
/*CATEGORIAS*/
router.post('/registrar-categoria',function(req,res){
	var obj = {
		"code_cat_eve":null,		
		"nomb_cat_eve":req.body.nomb_cat_eve,
		"img_cat_eve":domi+req.body.img_cat_eve
	};

	model.ejecutar('INSERT INTO categorias_eventos SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.code_cat_eve = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar-categoria',function(req,res){
	var obj = {
		"nomb_cat_eve":req.body.nomb_cat_eve,
		"img_cat_eve":domi+req.body.img_cat_eve
	};

	model.ejecutar('UPDATE categorias_eventos SET ? WHERE code_cat_eve = ?',[obj,req.body.code_cat_eve],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filaCambiada;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/eliminar-categoria',function(req,res,next){
	var obj = {};
	model.ejecutar('DELETE FROM categorias_eventos WHERE code_cat_eve = ?',[req.query.code_cat_eve],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Categoria Evento Eliminada';
        }else{
            obj.r = false;
        }
        res.json(obj);
	});
});

router.get('/obtener-categoria', function(req, res, next){
    model.consulta_multi('SELECT * FROM categorias_eventos WHERE code_cat_eve = '+req.query.code_cat_eve+';', function(data){
    	res.json(data.filas);
    });
});

router.get('/obtener-categorias', function(req, res, next){
    model.consulta_multi('SELECT * FROM categorias_eventos;', function(data){
    	res.json(data.filas);
    });
});

/*TIPOS*/
router.post('/registrar-tipo',function(req,res){
	var obj = {
		"code_tipo_eve":null,
		"nomb_tipo_eve":req.body.nomb_tipo_eve,
		"img_tipo_eve":domi+req.body.img_tipo_eve
	};

	model.ejecutar('INSERT INTO tipos_de_eventos SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.code_tipo_eve = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar-tipo',function(req,res){
	var obj = {
		"nomb_tipo_eve":req.body.nomb_tipo_eve,
		"img_tipo_eve":domi+req.body.img_tipo_eve
	};

	model.ejecutar('UPDATE tipos_de_eventos SET ? WHERE code_tipo_eve = ?',[obj,req.body.code_tipo_eve],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filaCambiada;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/eliminar-tipo',function(req,res,next){
	var obj = {};
	model.ejecutar('DELETE FROM tipos_de_eventos WHERE code_tipo_eve = ?',[req.query.code_tipo_eve],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Tipo de Evento Eliminado';
        }else{
            obj.r = false;
        }
        res.json(obj);
	});
});

router.get('/obtener-tipo', function(req, res, next){
    model.consulta_multi('SELECT * FROM tipos_de_eventos WHERE code_tipo_eve = '+req.query.code_tipo_eve+';', function(data){
    	res.json(data.filas);
    });
});

router.get('/obtener-tipos', function(req, res, next){
    model.consulta_multi('SELECT * FROM tipos_de_eventos;', function(data){
    	res.json(data.filas);
    });
});

router.get('/obtener-categorias-y-tipos', function(req, res, next){    
    var sqlc = "SELECT * FROM categorias_eventos;";
    var sqlt = "SELECT * FROM tipos_de_eventos";
    model.consulta_multi(''+sqlc+' '+sqlt+'', function(data){
    	res.json({categorias_eventos: data.filas[0],tipos_de_eventos:data.filas[1]});
    });
});

/*BOLETERIAS*/
router.post('/registrar-boleto',function(req,res,next){
	var obj = {
		"code_bole":null,
		"code_eve":req.body.code_eve,
		"esce_bole":req.body.esce_bole,
		"prec_bole":req.body.prec_bole,
		"cant_dis_bole":req.body.cant_dis_bole
	};

	model.ejecutar('INSERT INTO boleterias_eventos SET ?',obj,function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.code_bole = data.idInsertado;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/editar-boleto',function(req,res){
	var obj = {
		"code_eve":req.body.code_eve,
		"esce_bole":req.body.esce_bole,
		"prec_bole":req.body.prec_bole,
		"cant_dis_bole":req.body.cant_dis_bole
	};

	model.ejecutar('UPDATE boleterias_eventos SET ? WHERE code_bole = ?',[obj,req.body.code_bole],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.fila = data.filaCambiada;
        }else if(data.RESP == "DUPLICADO"){
            obj.r = false;
            obj.msj = "Este registro ya existe";
        }
        res.json(obj);
	});
});

router.post('/eliminar-boleto',function(req,res,next){
	var obj = {};
	model.ejecutar('DELETE FROM boleterias_eventos WHERE code_bole = ?',[req.query.code_bole],function(data){
		if(data.RESP == "OK"){
            obj.r = true;
            obj.msj = 'Boleto Eliminado';
        }else{
            obj.r = false;
        }
        res.json(obj);
	});
});

router.get('/obtener-boleto', function(req, res, next){
    model.consulta_multi('SELECT * FROM boleterias_eventos WHERE code_bole = '+req.query.code_bole+';', function(data){
    	res.json(data.filas);
    });
});

router.get('/obtener-boletos', function(req, res, next){
    model.consulta_multi('SELECT * FROM boleterias_eventos;', function(data){
    	res.json(data.filas);
    });
});

module.exports = router;