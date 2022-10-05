/////boton e input //////////////////////////
var inputAgregarPalabra = document.getElementById("inputAgregarPalabra");
var btn_AgregarPalabra = document.getElementById("btn_AgregarPalabra");
var alfabeto = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';


/////check //////////////////////////
function filtroAgregarPalabra(palabraInput){
    var filtroTrueFalse = "";
    var resultadoArray = "";
    var arrayTrue=[];

    for(var i=0; i < palabraInput.length; i++){

        for(var x=0; x < alfabeto.length; x++){

            resultadoArray="";
            
            if(palabraInput[i] == alfabeto[x]){
                resultadoArray = true;
               arrayTrue.push(resultadoArray);
            }
        }
    }

    if(palabraInput.length == arrayTrue.length){
        filtroTrueFalse = true;
    }else{
        filtroTrueFalse = false;
    }
   
    return filtroTrueFalse;
}

//añadir palabra
function agregarPalabra_DB(resultado,newPalabra){
    
    if(resultado){
        // 1.Utilizamos la solucion de un copañero, usando el storage.
        guardarlocalstg(newPalabra);
        window.location.href = "jugar.html";
        // window.location.href = "./juego.html";
        ////////////////////////////////////////

        alert("Se agrego correctamente");
        inputAgregarPalabra.value = "";
        inputAgregarPalabra.focus();
    }else{
        alert("Se debe ingresar letras solamente!");
        inputAgregarPalabra.value = "";
        inputAgregarPalabra.focus();
    }

}

//2.Guardar la palabra nueva en sessionStorage
function guardarlocalstg(contenido){
    sessionStorage.setItem("palabra",contenido);
}


function arranqueAgregarPalabra(){
    var nuevaPalabra = inputAgregarPalabra.value.toUpperCase();
    var resultado_Filtro = filtroAgregarPalabra(nuevaPalabra);
    
    agregarPalabra_DB(resultado_Filtro,nuevaPalabra);
}

btn_AgregarPalabra.onclick = arranqueAgregarPalabra;