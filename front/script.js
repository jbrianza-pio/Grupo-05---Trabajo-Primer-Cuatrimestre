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
        if (selection.lenght!=3){
            return selection
        }
        good++
    }
    alert("ERROR 444","Fallo de conexion con base de datos")
    return -1
}