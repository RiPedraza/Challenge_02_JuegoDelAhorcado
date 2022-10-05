var db_Palabras = ['HTML','PHP','AJAX'];
const mySet1 = new Set()
var conjuntoPalabrasFallidas = '';
var guionSimple = '_';


function dibujar(valorErrado){    
    var pantalla = document.querySelector('canvas');
    var pincel = pantalla.getContext('2d');

    pincel.fillStyle = 'lightgrey';
    pincel.fillRect(0, 0, 600, 400);
    pincel.fillStyle = "darkblue";

    function escesarioA(){
    // Escenario Base
    pincel.fillRect(150, 350, 250, 10);
    pincel.fillRect(200, 80, 10, 270);
    }     

    function escesarioB(){
        // Escenario Top
        pincel.fillRect(200, 80, 120, 10);
        pincel.fillRect(320, 80, 10, 50);
    }

    function cabeza(){
        // cabeza
        pincel.beginPath();
        pincel.arc(325, 155, 30, 0, 2*3.14);
        pincel.fill();
        pincel.fillStyle = 'lightgrey';
        pincel.beginPath();
        pincel.arc(325, 155, 25, 0, 2*3.14);
        pincel.fill();
    }
    
    function tronco(){
        // tronco
        pincel.fillStyle = "darkblue";
        pincel.fillRect(320, 180, 10, 80);
    }

    function brazoIzq(){
        // brazo izq
        pincel.beginPath();
        pincel.moveTo(320, 200);
        pincel.lineTo(290, 230);
        pincel.lineTo(295, 235);
        pincel.fill();
    }

    function brazoDer(){
        // brazo der
        pincel.beginPath();
        pincel.moveTo(330, 200);
        pincel.lineTo(360, 235);
        pincel.lineTo(365, 230);
        pincel.fill();
    }

    function piernaIzq(){
        // pierna izq
        pincel.beginPath();
        pincel.moveTo(320, 260);
        pincel.lineTo(290, 290);
        pincel.lineTo(295, 295);
        pincel.fill();
    }

    function piernaDer(){
        // pierna der
        pincel.beginPath();
        pincel.moveTo(330, 260);
        pincel.lineTo(360, 295);
        pincel.lineTo(365, 290);
        pincel.fill();
    }
    
    function sogaDead(){
        // soga-dead
        pincel.strokeStyle = 'red';
        pincel.lineWidth = 5;
        pincel.beginPath();
        pincel.moveTo(250, 120);
        pincel.lineTo(390, 290);
        pincel.stroke();
        pincel.beginPath();
        pincel.moveTo(390, 120);
        pincel.lineTo(250, 290);
        pincel.stroke();
    }

    switch(valorErrado){
        case 1:
            escesarioA();
        break;
        case 2:
            escesarioA();
            escesarioB();
        break;
        case 3:
            escesarioA();
            escesarioB();
            cabeza();
        break;
        case 4:
            escesarioA();
            escesarioB();
            cabeza();
            tronco();
        break;
        case 5:
            escesarioA();
            escesarioB();
            cabeza();
            tronco();
            brazoIzq();
        break;
        case 6:
            escesarioA();
            escesarioB();
            cabeza();
            tronco();
            brazoIzq();
            brazoDer();
        break;
        case 7:
            escesarioA();
            escesarioB();
            cabeza();
            tronco();
            brazoIzq();
            brazoDer();
            piernaIzq();
        break;
        case 8:
            escesarioA();
            escesarioB();
            cabeza();
            tronco();
            brazoIzq();
            brazoDer();
            piernaIzq();
            piernaDer();
        break;
        case 9:
            escesarioA();
            escesarioB();
            cabeza();
            tronco();
            brazoIzq();
            brazoDer();
            piernaIzq();
            piernaDer();
            sogaDead();
        break;
    }

} 

function sortearPalabraSecreta(maximo){
    return Math.floor(Math.random()*maximo);
}

function dibujarGuiones(largoTexto){
    var lbl_PalabrasCorrectas = document.getElementById("lbl_PalabrasCorrectas");
    var campoGuinesTotal = '';
    
    for(var i = 0; i < largoTexto; i++){
        campoGuinesTotal = campoGuinesTotal + guionSimple;
    }

    console.log(palabraSecreta);

    lbl_PalabrasCorrectas.innerHTML = campoGuinesTotal;
    return campoGuinesTotal;
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}

function almacenarLetrasErradas(str){
    mySet1.add(str);
    var acumular = '';

    for (let value of mySet1.values()) {
        acumular = acumular + value;
    }

    return acumular;
}

function filtro(letraInput){
    var filtroTrue = false;

    for(var i=0; i < alfabeto.length; i++){
        if(letraInput == alfabeto[i]){
            filtroTrue=true;
        }
    }

    return filtroTrue;
}

/////////////////////////////////////
//sector alerta si GANÓ o PERDIÓ
function mostrarAlerta(palabraSeleccionada,palabrasCorrectas,palabrasErradas){
    function esconderInput(){
        var esconderInput = document.getElementById("input_text");
        esconderInput.style.display = "none";
    }

    function mostrarAlertaGano(){
        console.log("GANÓ EL JUEGO!");
        document.getElementById("article_alert").style.display = "grid";
        document.getElementById("div_alerta_perdio").style.display = "none";
    }

    function mostrarAlertaPerdio(){
        console.log("PERDIÓ JUEGO!");
        document.getElementById("article_alert").style.display = "grid";
        document.getElementById("div_alerta_gano").style.display = "none";
    }


    if(palabrasErradas.length >= 9){
        mostrarAlertaPerdio();
        esconderInput()
    }else if(palabrasCorrectas == palabraSeleccionada){
        mostrarAlertaGano();
        esconderInput()
    }


}


////////////////////////////////////////////////
//3.funcion para pedir la palabra ingresada x sessionStorage
function llamardatosstg() {
    var palabranueva = sessionStorage.getItem("palabra");
    return palabranueva;
}

//4. variable con la palabra nueva
var palabraaingresar = llamardatosstg();

////////////////////////////////////////////////
// sector de arranque
dibujar(0);
//5.Comprobamos si llegó nueva palabra:
    if(palabraaingresar == null){
        var indiceSorteado = sortearPalabraSecreta(db_Palabras.length);
    }else{
        //Acá agregamos la nueva palabra.
        db_Palabras.push(palabraaingresar);
        var indiceSorteado = sortearPalabraSecreta(db_Palabras.length);
    }
var palabraSecreta = db_Palabras[indiceSorteado];
var guiones = dibujarGuiones(palabraSecreta.length);

////////////////////////////////////////
// sector jugar!
function comprobarCaracter(){
    var input_txt = document.getElementById("input_text");
    var letraIngresada = input_txt.value;
    var letraIngresada = letraIngresada.toUpperCase();
    var largo = palabraSecreta.length;
    var resultado = false;

    //////CHECK: ALFABETO! O NO! ////////
    if(filtro(letraIngresada)){

        for(var i=0; i < largo; i++){
            //almacenar con palabra CORRECTA
            if(letraIngresada == palabraSecreta[i]){
                resultado = true;
                guiones = guiones.replaceAt(i,letraIngresada);
            }
        }
        
        //Mostrar palabras fallidas (por pantalla)
        if(resultado == false){            
            conjuntoPalabrasFallidas = almacenarLetrasErradas(letraIngresada);
            
        }    

        lbl_PalabrasCorrectas.innerHTML = guiones;
        lbl_PalabrasIncorrectas.innerHTML = conjuntoPalabrasFallidas;
        
        dibujar(conjuntoPalabrasFallidas.length);
        
        
        mostrarAlerta(palabraSecreta,guiones,conjuntoPalabrasFallidas);

    }

    input_text.value = "";
    
}


input_text.oninput = comprobarCaracter;






