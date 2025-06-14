function getRandomInt() {
    let random = Math.floor(Math.random() * max);//establecer limite de pelicula
    return random
}
function selectRandomPeli(category) {
    let good = 0;
    while (good < 2) {
        let number = getRandomInt();
        let selection = fetchPelicula(number, category); //establecer funcion fetch get pelicula. 
        // Parametro dado ID y category a seleccionar.Parametro a espera TITLE, IMAGE_URL Y numero de categoria
        if (selection.lenght != 3) {
            return selection
        }
        good++
    }
    alert("ERROR 444", "Fallo de conexion con base de datos")
    return -1
}










































































//Inicio de sesión
function register() {
    let check = fetchPostUsuarioRegister(getUser(), getPassword()) //Se necesitaría que en el front se diseñe una función que reciba el usuario y la contraseña
    if (check == "No se pudo agregar el usuario, ya existe otro con ese nombre") {
        showModal("Error", "Ese usuario ya existe, ingrese uno nuevo")
    } else if(check > 0){
        login()
    }
}

function login(){
    let check = fetchGetUsuarioLogin(getUser(), getPassword()) //Lo mismo que con el register, que la función reciba los parámetros y los compare
    if (check > 0){
        changeScreen()
    } else if(check == 0){ //La función hecha en el back de usuarios conseguirá el usuario y la contraseña. Devolverá 0 o -1 si no funciona y el id de usuario si sí funciona
        showModal("Error", "No se ha ingresado correctamente la contraseña")
    } else if(check == -1){
        showModal("Error", "El usuario ingresado no existe")
    }
}