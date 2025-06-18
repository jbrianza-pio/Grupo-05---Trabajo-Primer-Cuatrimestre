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

// Fetchs del trolo de Mati

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