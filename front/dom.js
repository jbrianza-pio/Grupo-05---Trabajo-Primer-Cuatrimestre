//DOM generales
function getUser(){
    user = document.getElementById("inputUser").value;
    return user
}
function getPassword(){
    password = document.getElementById("inputPassword").value;
    return password
}

// dom modals

const modalJugar = document.getElementById("modalJugar")//encuentra con el modalid el elemento //Accder al elemento
const modalRanking = document.getElementById("modalRanking")//encuentra con el modalid el elemento//Accder al elemento
const modalSesion1 = document.getElementById("modalSesion1")//encuentra con el modalid el elemento//Accder al elemento
const modalSesion2 = document.getElementById("modalSesion2")//encuentra con el modalid el elemento//Accder al elemento
const modalFinal = document.getElementById("modalFinal")//encuentra con el modalid el elemento//Accder al elemento

//modal cuenta1
function showModalCuenta(){
    if (id_user==-1||id_user==undefined){
        closeModalCuenta2()
        showModalCuenta1()
    }else{
        closeModalCuenta1()
        showModalCuenta2()
    }
}
function showModalCuenta1(){ 
    modalSesion1.showModal()
}
function closeModalCuenta1(){
    modalSesion1.close()
}
//modal cuenta2
function showModalCuenta2(){ 
    document.getElementById("userLogued").textContent=usernameLogued
    modalSesion2.showModal()
}
function closeModalCuenta2(){
    modalSesion2.close()
}


//modal ranking
function showModalRanking(){ 
    modalRanking.showModal()
}
function closeModalRanking(){
    modalRanking.close()
}

// MODAL JUGAR
function showModalPlay(){
    modalJugar.showModal()
}
function closeModalPlay(){
    modalJugar.close()
}



//modal Final
function replaceandshowModalFinal(maxPoint,point){
    document.getElementById("pointModalFinal").textContent = point
    document.getElementById("maxpointModalFinal").textContent = maxPoint
    showModalFinal()
}
function showModalFinal(){ 
    modalFinal.showModal()
}
function closeModalFinal(){
    modalFinal.close()
}

// dom index
function changeScreen(){
    //investigar
}

function replaceSec1(peliculaSec1){
    document.getElementsByClassName("namePeli1").textContent=peliculaSec1[0]
    //modificar imagen de fondo css
}
function replaceSec2(peliculaSec2){
    document.getElementsByClassName("namePeliw").textContent=peliculaSec2[0]
    //modificar imagen de fondo css
}

// TESTEO DE COMO DEBE FUNCIONAR PARA REEMPLAZAR TEXTO EN DOM. 
// FUNCIONA CUANDO ELMODAL NO ESTA VISIBLE
// function mod(){
//     let mod=document.getElementById("a").textContent
//     mod ="a"
//     document.getElementById("a").textContent=mod
// }