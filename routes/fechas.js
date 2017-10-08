var Fechas = function(){
    this.FH = function(){
        var date = new Date();
        fecha = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        hora  = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        return fecha+" "+hora;
    }

    this.fechaActual = function(){
        var date = new Date();
        fecha = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        return fecha;
    }

    this.horaActual = function(){
        var date = new Date();
        hora  = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        return hora;
    }


    this.codeAleatorio = function(){
        var date = new Date();
        x1 = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();
        x2  = date.getHours()+""+date.getMinutes()+""+date.getSeconds();
        return x1+x2+(Math.random() * Math.random()).toString(16).replace('.', '');
    }

    this.sumarDiaAFecha = function(fecha, dias){
        var sumarDias=parseInt(dias);
        fecha=fecha.replace("-", "/").replace("-", "/");      
        fecha= new Date(fecha);
        fecha.setDate(fecha.getDate()+sumarDias);
        var anio=fecha.getFullYear();
        var mes= fecha.getMonth()+1;
        var dia= fecha.getDate();
        if(mes.toString().length<2){
            mes="0".concat(mes);        
        }    

        if(dia.toString().length<2){
            dia="0".concat(dia);        
        }
        return anio+"-"+mes+"-"+dia;
    }

}

module.exports = Fechas;
