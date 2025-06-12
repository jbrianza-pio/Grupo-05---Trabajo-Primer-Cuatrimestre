/* Ejemplos fetch

async function fetchGetDepartamento() {
    try {
        response = await fetch(`http://localhost:4000/departamentos`, {
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

async function completarDato() {
    let datos = {
        id_departamento: getDepartamento() // Obtiene el valor seleccionado
    };
    try {
        response = await fetch(`http://localhost:4000/insertarDepartamento`, {
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


async function borrarDepartamentoDatos() {
    let datos = {
        id_departamento: getDepartamento() // Obtiene el valor seleccionado
    };
    try {
        response = await fetch(`http://localhost:4000/borrarDepartamento`, {
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
} */

async function fetchGetPeliculas() {
    try {
        response = await fetch(`http://localhost:4000/departamentos`, {
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

async function fetchPostPeliculas() {
    let datos = {
        //    id_pelicula: // aca va el get correspondiente
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

async function fetchBorrarPeliculas() {
    let datos = {
        //    id_pelicula: // aca va el get correspondiente
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