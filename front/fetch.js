async function fetchGetPeliculas(id, parametro) {
    try {
        response = await fetch(`http://localhost:4000/peliculas?number=${id}&parametro=${parametro}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: ", error.message)
    }

}

async function fetchPostPeliculas(titulo, voto_espectadores, fecha, ganancia, link) {
    let datos = {
        titulo: titulo,
        voto_espectadores: voto_espectadores,
        fecha: fecha,
        ganancia:ganancia,
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
        alert("Hubo un error: ", error.message);
    }
}

async function fetchBorrarPeliculas(id) {
    let datos = {
        id_pelicula: id
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
        alert("Hubo un error: ", error.message);
    }
}

// Fetchs de los usuarios

async function fetchGetUsersId(username, password) {
    try {
        response = await fetch(`http://localhost:4000/usersId?username=${username}&password=${password}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        alert("Hubo un error: ", error.message)
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
        // result = result.stringify(JSON)
        return result
    } catch (error) {
        alert("Hubo un error: ", error.message)
    }

}

async function fetchPostInsertUser(username, password) {
    let datos = {
        username: username,
        password:password
    };
    try {
        response = await fetch(`http://localhost:4000/insertUser`, {
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
        alert("Hubo un error: ", error.message);
    }
}

async function fetchGetRecordPuntaje(id) {
    try {
        response = await fetch(`http://localhost:4000/recordPuntaje/id_usuario=${id}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        alert("Hubo un error: ", error.message)
    }

}

async function fetchPutRecord(puntaje, id_usuario) {
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
        alert("Hubo un error: ", error.message)

    }

}


async function llenarDatosRanking() {
    let tabla = document.getElementById("tabla").innerHTML
    let resulto = await fetchGetUsersRanking();
    // console.log(resulto)
    for (let i = 0; i < resulto.length; i++) {
        tabla += `<tr>
            <td>${resulto[i].username}</td>
            <td>${resulto[i].record}</td>
            </tr>`
    }
    console.log(tabla)
    document.getElementById("tabla").innerHTML = tabla;
}
llenarDatosRanking()

async function llenarDatosPersonal(id) {
    document.getElementById("puntajePropio").innerText = fetchGetRecordPuntaje(id);
}