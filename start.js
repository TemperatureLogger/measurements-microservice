// pachet folosit pentru partea de REST API server
const express = require('express');
// pachet folosit pentru formatarea log-urilor
const morgan = require('morgan');
// pachet folosit pentru adaugarea unor headere de securitate
const helmet = require('helmet');
// pachet folosit pentru trimiterea de erori
const createError = require('http-errors');
// pachet folosit pentru a putea face requesturi cross domain
var cors = require('cors');

// In spate, de fapt, face un try {} catch {} pe fiecare ruta definita de noi
// si apeleaza next() in cazul in care intalneste o eroare. 
// Este util pentru a nu scrie try...catch de fiecare data
require('express-async-errors'); 
// pachet folosit pentru injectarea timpului in momenul in care se da console.log()
require('log-timestamp');

// fisierul (scris de noi) care are configurate toate rutele
const routes = require('./routes.js'); 
 
// instantierea serverului efectiv
const app = express();

app.use(cors());

// adaugarea primului middleware, cel oferit de pachetul helmet
app.use(helmet());

// adaugarea celui de-al doilea middleware, cel oferit de pachetul morgan
app.use(morgan(':remote-addr - :remote-user [:date[web]] \
                ":method :url HTTP/:http-version" \
                :status :res[content-length]'));

// adaugarea celui de-al treilea middleware,
// extrage obiecte JSON din corpul cererilor. Util pentru POST si PUT
app.use(express.json());

// adaugarea celui de-al patrulea middleware
// extrage obiecte x-www-urlencoded din corpul cererilor.
// Util pentru POST si PUT, daca nu se foloseste JSON
// app.use(express.urlencoded({ extended: false }));
 
// adaugarea rutelor configurate de noi in lantul de rute, cu radacina /api
app.use('/api', routes);
 
// adaugarea unui middleware ce intercepteaza erorile
// foloseste createError pentru incapsularea lor
app.use((err, req, res, next) => {
    console.error(err);
    let status = 500;
    let message = 'Something Bad Happened';
    if (err.httpStatus) {
        status = err.httpStatus;
        message = err.message;
    } 
    return next(createError(status, message));
});
 
 
// stabilirea portului pe care va rula serverul in functie de variabila de mediu.
// Daca nu exista, este implicit 80
const port = process.env.PORT || 80;
 
// deschiderea serverului pe portul stabilit
app.listen(port, () => {
    console.log(`App is listening on ${port} and running on ${process.env.NODE_ENV} mode`);
});
