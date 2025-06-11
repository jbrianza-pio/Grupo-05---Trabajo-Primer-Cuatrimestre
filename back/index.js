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
app.post('/users', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT username FROM Usuarios WHERE username = "${req.body.username}"`);
        if (check !== undefined) {     //Este condicional corrobora que exista algun usuario con ese nombre de usuario
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

//Los usuarios para el ranking de los 10 mejores
app.get('/usersRanking', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT nombre, record FROM Usuarios ORDER BY record DESC LIMIT 10`);
        res.send(respuesta);
    }
    catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

//Obtiene el puntaje de la cuenta a partir del id de usuario (recordar que el id de usuario se obtuvo anteriormente, cuando se logueó)
app.get('/puntaje'), async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT record FROM Usuarios WHERE id_usuario = ${req.query.id_usuario}`);
        res.send(respuesta);
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
}

//Cambia el puntaje del usuario si este es mayor que su record. Sino, se encarga de obtener el puntaje máximo para comparar al final con el puntaje hecho
app.put('/record', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT record FROM Usuarios WHERE record > ${req.body.puntaje} AND id_usuario = ${req.body.id_usuario}`)  //Pasarle los puntos que hizo el usuario
        if (check !== undefined) {      //Este condicional corrobora que el récord sea mayor que el puntaje
            await realizarQuery(`SELECT record FROM Usuarios WHERE id_usuario = ${req.body.id_usuario}`)   //A través del id de usuario, se encarga de conseguir su puntaje máximo
        } else {
            await realizarQuery(`UPDATE Usuarios SET record = ${req.body.record} WHERE id_usuario = ${req.body.id_usuario}`);   //A través del id de usuario identifica qué record debe cambiar
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})