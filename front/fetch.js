async function fetchGetPeliculas(id_pelicula, parametro) {
    try {
        response = await fetch(`http://localhost:4000/peliculas?id_pelicula=${id_pelicula}&parametro=${parametro}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: ")
    }

}

async function fetchPostPeliculas(titulo, voto_espectadores, año, ganancia, link) {
    let datos = {
        titulo: titulo,
        voto_espectadores: voto_espectadores,
        año: año,
        ganancia: ganancia,
        link: link
    };
    try {
        response = await fetch(`http://localhost:4000/insertarPeliculas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response);
        let result = await response.json();
        console.log(result);
        alert(result.mensaje);
    } catch (error) {
        alert("Hubo un error: ");
    }
}

async function fetchBorrarPeliculas(id_pelicula) {
    let datos = {
        id_pelicula: id_pelicula
    };
    try {
        response = await fetch(`http://localhost:4000/borrarPeliculas`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response);
        let result = await response.json();
        console.log(result);
        alert("Se borró");
    } catch (error) {
        alert("Hubo un error: ");
    }
}

// Fetchs de los usuarios

async function fetchGetUsersId(username, password) {
    try {
        response = await fetch(`http://localhost:4000/users?username=${username}&password=${password}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        console.log(result)
        
        return result.res
    } catch (error) {
        alert("Hubo un error: ")
    }

}



async function fetchGetUsersRanking() {
    try {
        response = await fetch(`http://localhost:4000/usersRanking`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: ")
    }

}


async function llenarDatosRanking() {
    let tabla = document.getElementById("tabla").innerHTML
    let resulto = await fetchGetUsersRanking();
    for (let i = 0; i < resulto.length; i++) {
        tabla += `<tr>
            <td><p>${resulto[i].username}</p></td>
            <td><p>${resulto[i].record}</p></td>
            </tr>`
    }
    document.getElementById("tabla").innerHTML = tabla;
}
llenarDatosRanking()

async function fetchPostInsertUser(username, password) {
    let datos = {
        username: username,
        password: password
    };
    try {
        response = await fetch(`http://localhost:4000/insertUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        alert("Hubo un error: ");
    }
}

async function fetchGetRecordPuntaje(id) {
    try {
        response = await fetch(`http://localhost:4000/recordPuntaje?id_usuario=${id}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: ")
    }

}

async function llenarDatosPersonal(id_user) {   //Recibe el id de usuario del jugador logueado
    let puntajeJugador = await fetchGetRecordPuntaje(id_user);
    document.getElementById("puntajePropio").innerText = puntajeJugador[0].record
}

async function fetchPutRecord(id_usuario, puntaje) {
    try {
        let datos = {
            puntaje: puntaje,
            id_usuario: id_usuario
        }
        response = await fetch(`http://localhost:4000/record`, {
            method: "PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json();
        alert("Se modifico")
        return result
    } catch (error) {
        alert("Hubo un error: ")

    }
}

async function fetchGetPuntaje() {
    try {
        response = await fetch(`http://localhost:4000/getPuntaje`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: ")
    }

}


async function fetchPostPuntajes(fecha, puntaje, id_usuario) {
    let datos = {
        fecha: fecha,
        puntaje: puntaje,
        id_usuario: id_usuario
    };
    try {
        response = await fetch(`http://localhost:4000/insertarPuntaje`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response);
        let result = await response.json();
        console.log(result);
        alert(result.mensaje);
    } catch (error) {
        alert("Hubo un error: ");
    }
}

async function fetchPutPuntajes(puntaje) {
    try {
        let datos = {
            puntaje: puntaje
        }
        response = await fetch(`http://localhost:4000/modificarPuntaje`, {
            method: "PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json();
        alert("Se modifico")
        return result
    } catch (error) {
        alert("Hubo un error: ")

    }
}

async function fetchBorrarPuntaje(id_pelicula) {
    let datos = {
        id_pelicula: id_pelicula
    };
    try {
        response = await fetch(`http://localhost:4000/borrarPuntaje`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response);
        let result = await response.json();
        console.log(result);
        alert("Se borró");
    } catch (error) {
        alert("Hubo un error: ");
    }
}

async function fetchGetUltimoMejorPuntaje() {
    try {
        response = await fetch(`http://localhost:4000/getLastMaxPoint`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: ")
    }

}