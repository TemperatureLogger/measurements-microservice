// partea de calcul si interactiune cu alte module 
// aici vom interactiona cu baza de date

const {
    query
} = require ('../data');

const { ServerError } = require ('../errors');

const getAll = async () => {
    console.info('Get all');

    const temperatures = await query('SELECT * from measurements');

    return temperatures;
};

const getById = async (id) => {
    console.info('Getting temperature with ${id}');

    const measurements = await query('SELECT * FROM measurements \
                                        WHERE id = $1', [id]);
    // din start.js o sa primesc un rows, care este un vector
    // daca lungimea vectorului o sa fie < 1 ==> valoarea nu exista
    if (measurements.length !== 1) {
        throw new ServerError('This measurement does not exist', 404)
    }

    return temperature[0];
};

const add = async (time, temperature, humidity) => {
    console.info(`Adding measurement ${time, temperature, humidity}`);

    try {
        const measurements = await query (`INSERT INTO measurements \
                                            (temperature, humidity) \
                                            VALUES ($1, $2) RETURNING id`, 
                                            [temperature, humidity]);
        return measurements[0].id;
    } catch (e) {
        throw e;
    }

};

const update = async (id, time, temperature, humidity) => {
    console.info("Updating temperature");

    await query(`UPDATE measurements SET temperature=$1 \
                WHERE id=$3`, [temperature, humidity, id]);
};

const remove = async (id) => {
    console.info('Deleting temperature with ${id}');

    await query(`DELETE FROM measurements WHERE id=$1`, [id]);
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}