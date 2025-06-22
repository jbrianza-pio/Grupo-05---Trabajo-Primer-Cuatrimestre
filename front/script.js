//Funciones base

let peliculaSec1
let peliculaSec2
let parametro
let point 
let id_user

function getRandomInt(){
    let random = Math.floor(Math.random() * 494 );
    return random
}
function selectRandomPeli(parametro){
    let good = 0; 
    while (good<2){
        let id= getRandomInt();
        let selection = fetchGetPeliculas(id, parametro);  
        console.log(selection)
        // Parametro dado ID y parametro a seleccionar.Parametro a espera TITLE, IMAGE_URL Y numero de categoria
        if (selection.length!=3){
            return selection
        }
        good++
    }
    alert("ERROR 444","Fallo de conexion con base de datos")
    return -1
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion inicio

// elige y pone las peliculas iniciales
function seleccionIncial(){
    point=0
    peliculaSec1 =selectRandomPeli(parametro);
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 =selectRandomPeli(parametro);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}

//prepara las variables para el juego luego de la seleccion
function changeGame(buttonparametro){
    parametro = buttonparametro
    console.log(parametro)
    changeScreen()//falta hacer ui y DOM
    seleccionIncial(parametro)
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion finalizo


//inicia la finalizacion luego de elegir
function buttonAnswer(selecctionAnswer){//hacer llegar el atributo del boton
    if (peliculaSec1.parametro>peliculaSec2.parametro){
        correctAnswer=peliculaSec1
    }if (peliculaSec2.parametro>peliculaSec1.parametro){
        correctAnswer=peliculaSec1
    }else{
        correctAnswer="igual"
    }
    if (selecctionAnswer==corretcAnswer || correctAnswer=="igual") {
        point++
        replaceSelection()
    }else{
        let maxPoint = fetchGetRecordPuntaje(id_user) 
        // Parametro dado ID de user. Parametro a espera Max Points
        if(maxPoint<point){
            maxPoint=point
            fetchPutRecord(id_user,maxPoint)
        // Parametro dado ID de user y puntos max.
            let tenPlace = getLastMaxPoint()//establecer funcion fetch get max puntos 
        // Parametro recibe el decimo puesto de la tabla (puntaje)
            if(tenPlace<maxPoint){
                putPointTabla(id_user,maxPoint)//establecer funcion post max puntos 
                //parametro dado id del user y puntos maximos
            }
            replaceandshowModalFinal(maxPoint,point)
        }
    }
}

//cambia de posicion y busca nueva peli
function replaceSelection(){
    peliculaSec1 = peliculaSec2
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 = selectRandomPeli(parametro);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}