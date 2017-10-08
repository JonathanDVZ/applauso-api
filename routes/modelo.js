var Modelo = function(){
    this.dominio = "http://localhost/applauso-node/";
    this.ejecutar = function(sql, datos, retorno){
        con.query(sql, datos, function(err, rsp, fields){
            console.log("ERRSQLE: "+err);
            if(err && err.code == "ER_DUP_ENTRY"){
                retorno({
                    RESP: "DUPLICADO"
                });
            }else if(err && err.code == "ER_PARSE_ERROR"){
                retorno({
                    RESP: "ERR_SYN"
                });
            }else if(rsp){
                if(rsp.affectedRows>0 || rsp.changedRows>0){
                    retorno({
                        RESP: "OK",
                        filasAfectadas: rsp.affectedRows,
                        filasCambiadas: rsp.changedRows,
                        idInsertado: rsp.insertId,
                    });
                }else{
                    retorno({
                        RESP: "NO",
                    });
                }
            }
        });
    }

    // Consultar con scaping directo
    this.consultar = function(sql, rsp, retorno){
        con.query(sql, rsp, function(err, rsp){
            console.log("ERRSQLC: "+err);
            if(err && err.code == "ER_PARSE_ERROR"){
                retorno({
                    RESP: "ERR_SYN"
                });
            }else if(rsp && rsp.length>0){
                retorno({
                    RESP: "OK",
                    nFilas: rsp.length,
                    fila: rsp[0],
                    filas: rsp
                });
            }else if(rsp && rsp.length==0){
                retorno({
                    RESP: "NO",
                    nFilas: rsp.length,
                });
            }
        });
    }

     // Consulta Multiple con scaping directo
    this.consulta_multi = function(sql, retorno){
        con.query(sql, function(err, rsp){
            console.log("ERRSQLC: "+err);
            if(err && err.code == "ER_PARSE_ERROR"){
                retorno({
                    RESP: "ERR_SYN"
                });
            }else if(rsp && rsp.length>0){
                retorno({
                    RESP: "OK",
                    nFilas: rsp.length,
                    fila: rsp[0],
                    filas: rsp
                });
            }else if(rsp && rsp.length==0){
                retorno({
                    RESP: "NO",
                    nFilas: rsp.length,
                });
            }
        });
    }
}

module.exports = Modelo;
