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
function replaceSec1(){

}
function replaceSec2(){

}
function loop(category){
    let peliculaSec1 =selectRandomPeli(category);
    replaceSec1(); //falta definir variable y UI
    let peliculaSec2 =selectRandomPeli(category);
    replaceSec1(); //falta definir variable y UI
    let game=true
    let mayor
    while (game){
        if (peliculaSec1.category>peliculaSec2.category){//compara cuales mayor
            mayor=peliculaSec1
        }else{
            mayor=peliculaSec1
        }
    }
}