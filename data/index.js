const {
    Pool
} = require('pg');

// const {
//     getSecret
// } = require('docker-secret');


const options = {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    user: process.env.NODE_ENV === 'development' ? process.env.PGUSER : getSecret(process.env.PGUSER_FILE),
    password: process.env.NODE_ENV === 'development' ? process.env.PGPASSWORD : getSecret(process.env.PGPASSWORD_FILE)
}

console.log(options);

// conexiunea cu baza de date
const pool = new Pool(options); 

// orice raspuns pe care il folosesc folosing pg imi intoarce un rows
// care e de fapt un vector de raspunsuri

// functia returneaza doar un rows, nu tot ce intoarce baza de date
// async - returneaza o promisiun
const query = async (test, params) => {
    const {
        rows,
    } = await pool.query (test, params);
    return rows;
};

module.exports = {
    query,
};