// partea de calcul si interactiune cu alte module 
// aici vom interactiona cu baza de date

const {
    query
} = require ('../data');

const { ServerError } = require ('../errors');

const getAll = async (serialNumber) => {
    console.info('Get all');

    const measurements = await query('SELECT * from measurements \
                                        WHERE serialnumber = $1', [serialNumber]);

    return measurements;
};

const getById = async (serialNumber, time) => {
    console.info(`Getting temperature with ${time}`);

    const measurements = await query('SELECT * FROM measurements \
                                        WHERE \
                                            serialnumber = $1 AND \
                                            time = $2', [time, serialNumber]);

    // din start.js o sa primesc un rows, care este un vector
    // daca lungimea vectorului o sa fie < 1 ==> valoarea nu exista
    if (measurements.length !== 1) {
        throw new ServerError('This measurement does not exist', 404)
    }

    return measurements[0];
};

const getCustomMeasurements = async (serialNumber, measurementsNo) => {
    console.info(`Getting custom number of temperatures ${measurementsNo}`);

    const measurements = await query('SELECT * FROM measurements \
                                        WHERE serialnumber = $1 \
                                        ORDER BY time DESC \
                                        LIMIT $2', [serialNumber, measurementsNo]);

    return measurements;
};

const add = async (time, temperature, humidity, serialNumber) => {
    console.info(`Adding measurement ${time, temperature, humidity, serialNumber}`);

    try {
        const measurements = await query (`INSERT INTO measurements \
                                            (time, temperature, humidity, serialnumber) \
                                            VALUES ($1, $2, $3, $4) RETURNING time`, 
                                            [time, temperature, humidity, serialNumber]);
        return measurements[0].time;
    } catch (e) {
        if (e.code === '23505') {
            throw new ServerError(`There is already an entry added at time ${time}!`, 409);
        }
    }
};

const update = async (time, temperature, humidity) => {
    console.info("Updating temperature");

    await query(`UPDATE measurements SET temperature=$1 \
                WHERE time=$3`, [temperature, humidity, time]);
};

const remove = async (time) => {
    console.info('Deleting temperature with ${time}');

    await query(`DELETE FROM measurements WHERE time=$1`, [time]);
};

module.exports = {
    getAll,
    getById,
    getCustomMeasurements,
    add,
    update,
    remove
}
