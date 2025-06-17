var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//Crea un nuevo usuario una vez se checka el login, y devuelve el id. Tener en cuenta que el id lo van a usar para obtener los siguientes pedidos
app.post('/usersRegistro', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT username FROM Usuarios WHERE username = "${req.body.username}"`);
        if (check.length == 0) {     //Este condicional corrobora que exista algun usuario con ese nombre de usuario
            await realizarQuery(`INSERT INTO Usuarios (username, password, record) VALUES
                ("${req.body.username}", "${req.body.password}", 0)`)      //Cambiar a nombres de variables que sean el username y la password, el récord por default es 0
            let respuesta = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE username = "${req.body.username}"`)  //Pasarle como parámetro el nombre de usuario, de acá en más nos manejaremos con el nombre de usuario
            res.send(respuesta)
        } else {
            res.send("No se pudo agregar el usuario, ya existe otro con ese nombre")
        };
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})


//Esta función checkea que primero exista un usuario con ese nombre y luego checkea si la contraseña y el usuario coinciden 
app.get('/usersLogin', async function (req, res) {
    try {
        let checkUsuario = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE username = "${req.query.username}"`)
        if (checkUsuario.length == 0) {
            res.send("-1")   //Importante que hagan un parseInt en el front para cambiarlo a integer, sí funciona bien el register
        } else if (checkUsuario.length > 0) {
            let checkContraseña = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE username = "${req.query.username}" AND password = "${req.query.password}"`)
            if (checkContraseña.length == 0) {
                res.send("0")  //Importante que hagan un parseInt en el front para cambiarlo a integer, sí funciona bien el register
            } else {
                res.send(checkContraseña)
            }
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

//Los usuarios para el ranking de los 10 mejores
app.get('/usersRanking', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT username, record FROM Usuarios ORDER BY record DESC LIMIT 10`);
        res.send(respuesta);
    }
    catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})





//PEDIDOS BACK DE PELICULAS
// titulo, img y la categoria todo por el query; y try catch




app.get('/peliculas', async function (req, res) {
    try {
        let parametro = req.query.parametro

        let respuesta;
        respuesta = await realizarQuery(`SELECT titulo, link, ${parametro} FROM Peliculas WHERE id_pelicula=${req.query.id}`);
        res.send(respuesta)
    } catch (error) {
        res.send(error)
    }

});

app.delete('/borrarPeliculas', async function (req, res) {
   try {
    await realizarQuery(`
        DELETE FROM Peliculas WHERE id_pelicula = '${req.body.id}'`)
    res.send("Se elimino correctamente")
   } catch (error) {
        res.send(error)
   }

})

app.post('/insertarPeliculas', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT * FROM Peliculas WHERE titulo = "${req.body.titulo}" AND voto_espectadores = "${req.body.voto_espectadores}"  AND fecha = "${req.body.fecha}" AND ganancia = "${req.body.ganancia} AND link = "${req.body.link}`)
        if (check.length == 0) {
            await realizarQuery(` INSERT INTO Peliculas (titulo, voto_espectadores, fecha, ganancia, link )
                VALUES ("${req.body.titulo}", "${req.body.voto_espectadores}", "${req.body.fecha}", "${req.body.ganancia}", "${req.body.link}");`)
            res.send({ mensaje: "Pelicula agregada correctamente" });
        }
        else {
            res.send({ mensaje: "Pelicula ya existe" })
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
});

//Obtiene el puntaje de la cuenta a partir del id de usuario (recordar que el id de usuario se obtuvo anteriormente, cuando se logueó)
app.get('/recordPuntaje', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT record FROM Usuarios WHERE id_usuario = ${req.query.id_usuario}`);
        res.send(respuesta);
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
}
)

//Cambia el puntaje del usuario si este es mayor que su record. Sino, se encarga de obtener el puntaje máximo para comparar al final con el puntaje hecho
app.put('/record', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT record FROM Usuarios WHERE record >= ${req.body.puntaje} AND id_usuario = ${req.body.id_usuario}`)  //Pasarle los puntos que hizo el usuario
        console.log(check)
        if (check.length == 0) {      //Este condicional corrobora que el récord sea mayor que el puntaje
            await realizarQuery(`UPDATE Usuarios SET record = ${req.body.puntaje} WHERE id_usuario = ${req.body.id_usuario}`);   //A través del id de usuario identifica qué record debe cambiar
            res.send("Record cambiado")
        } else{
            res.send("El puntaje no es mayor que el record")
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Para cambiar el auto-increment del SQL si se generan usuarios que de prueba:
//ALTER TABLE Usuarios AUTO_INCREMENT = 1

