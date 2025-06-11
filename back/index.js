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

app.get('/users', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT nombre FROM Usuarios ORDER BY puntaje LIMIT 10`);
        res.send(respuesta);
    }
    catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

/* Ejemplos de pedidos

app.get('/departamentos', async function (req, res) {
    let respuesta;
    if (req.query.id != undefined)
        respuesta = await realizarQuery(`SELECT * FROM Departamento WHERE id_departamento=${req.query.id}`);
    else
        respuesta = await realizarQuery(`SELECT * FROM Departamento`);
    res.send(respuesta);
});
 */

/* app.delete('/borrarDepartamento', function (req, res) {
    realizarQuery(`
        DELETE FROM Departamento WHERE id_departamento = '${req.body.id_departamento}'`)
    res.send("Se elimino correctamente")

}) */
/* 
    app.post('/insertarDepartamento', async function (req, res) {
        try {
            let check = await realizarQuery(`SELECT * FROM Departamento WHERE tiene_balcon = "${req.body.tiene_balcon}" AND cantidad_ambientes = "${req.body.cantidad_ambientes}"  AND id_piso = "${req.body.id_piso}"`)
            if (check.length == 0) {
                await realizarQuery(` INSERT INTO Departamento (tiene_balcon, cantidad_ambientes, id_piso )
                    VALUES ("${req.body.tiene_balcon}", "${req.body.cantidad_ambientes}", "${req.body.id_piso}");`)
                res.send({ mensaje: "Departamento agregado correctamente" });
            }
            else {
                res.send({ mensaje: "Departamento ya existe" })
            }
        } catch (error) {
            res.send({ mensaje: "Tuviste un error", error: error.message });
            }
    });
     */


//PEDIDOS BACK DE PELICULAS

app.get('/peliculas', async function (req, res) {
    let respuesta;
    respuesta = await realizarQuery(`SELECT * FROM Peliculas WHERE id_pelicula=${req.query.id}`);
    res.send(respuesta)

});

app.delete('/borrarPeliculas', async function (req, res) {
    await realizarQuery(`
        DELETE FROM Peliculas WHERE id_pelicula = '${req.body.id}'`)
    res.send("Se elimino correctamente")

})

app.post('/insertarPeliculas', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT * FROM Peliculas WHERE titulo = "${req.body.titulo}" AND voto_espectadores = "${req.body.voto_espectadores}"  AND fecha = "${req.body.fecha}" AND ganancia = "${req.body.ganancia} AND link = "${req.body.link}`)
        if (check.length == 0) {
            await realizarQuery(` INSERT INTO Peliculas (titulo, voto_espectadores, fecha, ganancia, link )
                VALUES ("${req.body.titulo}", "${req.body.voto_espectadores}", "${req.body.fecha}", "${req.body.ganancia}", "${req.body.link}");`)
            res.send({ mensaje: "Departamento agregado correctamente" });
        }
        else {
            res.send({ mensaje: "Pelicula ya existe" })
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
});