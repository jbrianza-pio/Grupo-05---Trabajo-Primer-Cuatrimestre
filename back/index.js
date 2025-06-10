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

app.get('/usersRanking', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT nombre, record FROM Usuarios ORDER BY record DESC LIMIT 10`);
        res.send(respuesta);
    }
    catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

app.get('/puntaje'), async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT record FROM Usuarios ORDER BY record DESC LIMIT 1`);
        res.send(respuesta);
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
}

//Esto es para que lo usen en el front y obtengan el id que le van a agregar a la tbal de puntajes a la columna users
app.get('/idDeUsuario'), async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE username = "${req.query.username}"`);
        res.send(respuesta);
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
}

app.post('/users', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT username FROM Usuarios WHERE username = "${req.body.username}"`);
        if (check !== undefined) {
            await realizarQuery(`INSERT INTO Usuarios (username, password, record) VALUES
                ("${req.body.username}", "${req.body.password}", 0)`)
        } else {
            res.send("No se pudo agregar el usuario, ya existe otro con ese nombre")
        };
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

app.post('/nuevoPuntaje'), async function (req, res) {
    try {
        await realizarQuery(`INSERT INTO Puntaje (fecha, puntaje, user) VALUES
            (${new Date()}, ${req.body.puntaje}, ${req.body.user})`)
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }

}

app.put('/record', async function (req, res) {
    try {
        await realizarQuery(`UPDATE Usuarios SET record = ${req.body.record} WHERE id_usuario = ${req.body.id_usuario}`);
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})