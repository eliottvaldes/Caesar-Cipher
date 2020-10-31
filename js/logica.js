

//vamos a crear una funcion que se encargue del cifrado de cesar
//let 
var cesar = cesar || (function(){
    //funcion anonima :3 
    //callback

    var doStaff = function(txt, desp, action){
        var replace = (function(){
            //mi abecedario
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
              var l = abc.length;

            //funcion que se encarga de cifrar
            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                //vamos a verificar que no este vacio
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        // forward
                        pos += desp;
                        pos -= (pos >= l)?l:0;
                    } else {
                        // backward
                        pos -= desp;
                        pos += (pos < 0)?l:0;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();

        //aqui es donde tenemos que hacer el match
        var re = (/([ña-z])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    //ahora solo falta saber si quiero cifrar o descifrar
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },

        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();

//evitar entrada de numeros
function nonum() {
    var texto=document.getElementById("cadena").value;
    // obtener semilla
    var num = (/([0-9])/ig);
    if(texto.match(num)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor no ingreses numeros',
          })
    }
}
//Funcion para codificar
function codificar(){
    //texto
    var texto=document.getElementById("cadena").value;
    // obtener semilla
    var seed=document.getElementById("modulo").value;
    var num = (/([0-9])/ig);
    if(texto.match(num)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor no ingreses numeros',
          })
    }else{
        if(seed.length<=0 || texto.length<=0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llena los campos',
            })
        }else{
            seed=parseInt(seed.substring(0, 10));
            if (seed<0){
                seed=seed*-1;
            }
            var mod=seed%27;
            var cb=document.getElementById('notes');
            cb.innerHTML='La Semilla utilizada fue: ' + seed + '\n' +'Numero de posiciones recorridas: ' + mod;
            //obtener el texto del ctextarea
            document.getElementById("resultado").innerHTML = cesar.encode(
            document.getElementById("cadena").value, mod);
            document.getElementById("des").innerHTML =' ';
        }
    }
}
//funcion para decodificar
function decodificar(){
    // obtener semilla
    var seed=document.getElementById("modulo").value;
    seed=parseInt(seed.substring(0, 10));
    if (seed<0){
        seed=seed*-1;
    }
    var mod=seed%27;
    //obtener el texto del textarea
    document.getElementById("des").innerHTML = cesar.decode(
    document.getElementById("resultado").value, mod);      
}
//funcion para limpiar campos
function clean() {
    let cadena=document.getElementById("cadena").value;
    cadena.innerHTML='';
    document.getElementById("resultado").innerHTML ='';
    document.getElementById("des").innerHTML ='';
    document.getElementById("notes").innerHTML ='';
}


