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

// elige y pone las peliculas iniciales
function seleccionIncial(category){
    let peliculaSec1 =selectRandomPeli(category);
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    let peliculaSec2 =selectRandomPeli(category);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
    return peliculaSec1, peliculaSec2    //falta devolver bien  valores
}

//compara cuales mayor y guarda la variable
function compare(category,peliculaSec1,peliculaSec2){
    let mayor
    if (peliculaSec1.category>peliculaSec2.category){
        mayor=peliculaSec1
    }if (peliculaSec2.category>peliculaSec1.category){
        mayor=peliculaSec1
    }else{
        mayor="igual"
    }
    return mayor
}

//prepara las variables para el juego luego de la seleccion
function changeGame(){
    let category = getCategory()//falta definir variable y UI // DOM
    seleccionIncial(category)
    let corretcAnswer = compare(category,peliculaSec1,peliculaSec2)
}

//inicia la finalizacion luego de elegir
function buttonAnswer(selecctionAnswer){//hacer llegar el atributo del boton
    if (selecctionAnswer==corretcAnswer || selecctionAnswer=="igual") {
        replaceSelection()
    }else{
        finalizer()
    }
}

//termina y vuelve a pantalla inicial
function finalizer(){

}

//cambia de posicion y busca nueva peli
function replaceSelection(category){
    peliculaSec1 = peliculaSec2
    peliculaSec2 = selectRandomPeli(category);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
    let corretcAnswer = compare(category,peliculaSec1,peliculaSec2)
}