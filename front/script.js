//Funciones base

let peliculaSec1
let peliculaSec2
let category
let point 

function getRandomInt(){
    let random = Math.floor(Math.random() * max );//establecer limite de pelicula
    return random
}
function selectRandomPeli(category){
    let good = 0;
    while (good<2){
        let number= getRandomInt();
        let selection = fetchPelicula(number, category); //establecer funcion fetch get pelicula. 
        // Parametro dado ID y category a seleccionar.Parametro a espera TITLE, IMAGE_URL Y numero de categoria
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
    peliculaSec1 =selectRandomPeli(category);
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 =selectRandomPeli(category);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}

//prepara las variables para el juego luego de la seleccion
function changeGame(buttonCategory){
    category = buttonCategory
    change()//falta hacer ui y DOM
    seleccionIncial(category)
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion finalizo


//inicia la finalizacion luego de elegir
function buttonAnswer(selecctionAnswer){//hacer llegar el atributo del boton
    if (peliculaSec1.category>peliculaSec2.category){
        correctAnswer=peliculaSec1
    }if (peliculaSec2.category>peliculaSec1.category){
        correctAnswer=peliculaSec1
    }else{
        correctAnswer="igual"
    }
    if (selecctionAnswer==corretcAnswer || correctAnswer=="igual") {
        point++
        replaceSelection()
    }else{
        finalizer()
    }
}

//termina y vuelve a pantalla inicial
function finalizer(){
    modalFinal()//falta definir variable y UI // DOM

}

//cambia de posicion y busca nueva peli
function replaceSelection(){
    peliculaSec1 = peliculaSec2
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 = selectRandomPeli(category);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}