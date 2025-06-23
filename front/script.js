
//Funciones base
let peliculaSec1
let peliculaSec2
let parametro
let point
let id_user = -1
let usernameLogued

function getRandomInt() {
    let random = Math.floor(Math.random() * 494);
    return random
}
function selectRandomPeli(parametro) {
    let good = 0;
    while (good < 2) {
        let id = getRandomInt();
        let selection = fetchGetPeliculas(id, parametro);
        console.log(selection)
        // Parametro dado ID y parametro a seleccionar.Parametro a espera TITLE, IMAGE_URL Y numero de categoria
        if (selection.length != 3) {
            return selection
        }
        good++
    }
    alert("ERROR 444", "Fallo de conexion con base de datos")
    return -1
}
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion inicio

// elige y pone las peliculas iniciales
function seleccionIncial() {
    point = 0
    peliculaSec1 = selectRandomPeli(parametro);
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 = selectRandomPeli(parametro);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}

//prepara las variables para el juego luego de la seleccion
function changeGame(buttonparametro) {
    parametro = buttonparametro
    console.log(parametro)
    changeScreen()//falta hacer ui y DOM
    seleccionIncial()
}
//prepara el juego devuelta
function playAgain() {
    seleccionIncial()
    closeModalFinal()
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion finalizo


//inicia la finalizacion luego de elegir
function buttonAnswer(selecctionAnswer) {//hacer llegar el atributo del boton
    if (peliculaSec1.parametro > peliculaSec2.parametro) {
        correctAnswer = peliculaSec1
    } if (peliculaSec2.parametro > peliculaSec1.parametro) {
        correctAnswer = peliculaSec1
    } else {
        correctAnswer = "igual"
    }
    if (selecctionAnswer == corretcAnswer || correctAnswer == "igual") {
        point++
        replaceSelection()
    } else {
        let maxPoint = fetchGetRecordPuntaje(id_user)
        // Parametro dado ID de user. Parametro a espera Max Points
        if (maxPoint < point) {
            maxPoint = point
            fetchPutRecord(id_user, maxPoint)
            // Parametro dado ID de user y puntos max.
        }
        let tenPlace = getLastMaxPoint()//establecer funcion fetch get max puntos 
        // Parametro recibe el decimo puesto de la tabla (puntaje)
        if (tenPlace < maxPoint) {
            putPointTabla(id_user, maxPoint)//establecer funcion post max puntos 
            //parametro dado id del user y puntos maximos
        }
        replaceandshowModalFinal(maxPoint, point)

    }
}

//cambia de posicion y busca nueva peli
function replaceSelection() {
    peliculaSec1 = peliculaSec2
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 = selectRandomPeli(parametro);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}
//Inicio de sesión
async function register() {
    let check = await fetchPostInsertUser(getUser(), getPassword())
    if (check.res[0].id_usuario > 0) {
        login()
    } else {
        alert("Error. Ese usuario ya existe, ingrese uno nuevo")
    }
}

async function login() {
    let check = await fetchGetUsersId(getUser(), getPassword())
    if (check[0].id_usuario > 0) {
        usernameLogued = check[0].username
        id_user = check[0].id_usuario
        alert("Iniciando sesion")
        showModalCuenta()
        changeScreen()
        await llenarDatosPersonal(id_user)
    } else if (check == "0") { //La función hecha en el back de usuarios conseguirá el usuario y la contraseña. Devolverá 0 o -1 si no funciona y el id de usuario si sí funciona
        alert("Error. No se ha ingresado correctamente la contraseña")
    } else if (check == "-1") {
        alert("Error. El usuario ingresado no existe")
    }
}

function closeAccount() {
    id_user = -1
    showModalCuenta()
    document.getElementById("inputUser").value = ""
    document.getElementById("inputPassword").value = ""
    document.getElementById("puntajePropio").innerText = "Inicia sesión para ver tu puntaje máximo"
}