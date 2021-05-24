// au rolul de a descrie logica de rutare si de verificare a parametrilor

// pentru creeare rute
const Router = require('express').Router();

// importarea clasei de erori 
const {
    ServerError
} = require('../errors');

// functiile din servicii
const {
    getAll,
    getById,
    getCustomMeasurements,
    add,
    update,
    remove
} = require('./services.js');

// pentru a creea un CRUD: GET, POST, DELETE, PUT
// ruta de GET pentru /api/measurements/:id
// returneaza datele despre masuratoarea cu id-ul respectiv
Router.get('/:time', async (req, res) => {

    // preiau parametrul id din parametrii de cerere
    const {
        time
    } = req.params;

    // apelez functia din servicii
    const measurement = await getById(time);

    // returnez obiectul sub forma de json
    res.json(measurement);

});


// ruta de GET pentru /api/measurements/period/:no
// returneaza datele despre masuratoarea cu id-ul respectiv
Router.get('/period/:measurementsNo', async (req, res) => {

    // preiau parametrul id din parametrii de cerere
    const {
        measurementsNo
    } = req.params;

    // apelez functia din servicii
    const measurement = await getCustomMeasurements(measurementsNo);

    // returnez obiectul sub forma de json
    res.json(measurement);

});


// ruta de GET pentru /api/measurements/
// returneaza toate masuratorile
Router.get('/', async (req, res) => {

    // preiau parametrul id din parametrii de cerere
    const {
        time
    } = req.params;

    // apelez functia din servicii
    const measurements = await getAll();

    // returnez obiectul sub forma de json
    res.json(measurements);

});

// ruta de POST pentru adaugarea unei masuratori in sistem
// returneaza toate masuratorile
Router.post('/', async (req, res) => {

    // express imi prelucreaza sirul si mi-l pune pe tot in body
    // din body eu extrag datele de care am nevoie
    const {
        time,
        temperature,
        humidity,
        serialNumber
    } = req.body;

    // if (Number(temperature) == Nan) {
    // if (Number.isNaN(Number(temperature)) !== Number.isNaN(Number(temperature))) {
    //     throw new ServerError("Temperature need to be a number", 400);
    // }

    const id = await add(parseFloat(time),
                        parseFloat(temperature), 
                        parseFloat(humidity),
                        parseInt(serialNumber));

    // returnez obiectul sub forma de json
    res.json({time, temperature, humidity, serialNumber});

});

Router.put('/:id', async (req, res) => {

    const {
        time
    } = req.params;

    const {
        temperature,
        humidity
    } = req.body;
    
    await update(time, temperature, humidity);

    res.json({time, temperature, humidity});
});

Router.delete('/:id', async (req, res) => {

    const {
        time
    } = req.params;

    await remove(time);

    // .end() inchide fluxul de cerere-raspuns
    res.status(200).end();

});

module.exports = Router;