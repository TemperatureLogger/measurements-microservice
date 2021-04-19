const express = require('express'); // pachet folosit pentru partea de REST API server
const morgan = require('morgan'); // pachet folosit pentru formatarea log-urilor
const helmet = require('helmet'); // pachet folosit pentru adaugarea unor headere de securitate
const createError = require('http-errors'); // pachet folosit pentru trimiterea de erori
 
// In spate, de fapt, face un try {} catch {} pe fiecare ruta definita de noi si apeleaza next() in cazul in care intalneste o eroare. 
// Este util pentru a nu scrie try...catch de fiecare data
require('express-async-errors'); 
// pachet folosit pentru injectarea timpului in momenul in care se da console.log()
require('log-timestamp');
 
// fisierul (scris de noi) care are configurate toate rutele
const routes = require('./routes.js'); 
 
// instantierea serverului efectiv
const app = express();
 
// adaugarea primului middleware, cel oferit de pachetul helmet
app.use(helmet());

// adaugarea celui de-al doilea middleware, cel oferit de pachetul morgan
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
// adaugarea celui de-al treilea middleware, cel care extrage obiecte JSON din corpul cererilor. Util pentru POST si PUT
app.use(express.json());
// adaugarea celui de-al patrulea middleware, cel care extrage obiecte x-www-urlencoded din corpul cererilor. Util pentru POST si PUT, daca nu se foloseste JSON
// app.use(express.urlencoded({ extended: false }));
 
// adaugarea rutelor configurate de noi in lantul de rute, cu radacina /api
app.use('/api', routes);
 
// adaugarea unui middleware ce intercepteaza erorile si foloseste createError pentru incapsularea lor
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
 
 
// stabilirea portului pe care va rula serverul in functie de variabila de mediu. Daca nu exista, este implicit 80
const port = process.env.PORT || 80;
 
// deschiderea serverului pe portul stabilit
app.listen(port, () => {
    console.log(`App is listening on ${port} and running on ${process.env.NODE_ENV} mode`);
});







// const express = require('express');
// const mongo = require('mongodb');

// // const {MongoClient} = require('mongodb');

// // Constants
// const PORT = 8080;
// const HOST = '0.0.0.0';

// // create a Mongo Client
// var MongoClient = require('mongodb').MongoClient;
// // var url = "localhost:27017";
// var url = "mongodb://localhost:27017/test"

// // var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

// // // App
// // const app = express();
// // app.get('/', (req, res) => {
// //   res.send('Hai ca merge si asta');
// // });


// MongoClient.connect(url, function(err, db) {
// // mongoclient.open(function(err, mongoclient) {
//     if (err) throw err;
//     console.log("Database created!");
//     // db.close();
//     // mongoclient.close();
//   });

// // MongoClient.connect(url, function(err, db) {
// //   if (err) throw err;
// //   console.log("Database created!");
// //   var dbo = db.db("test");
// //   dbo.collection("cars").findOne({}, function(err, result) {
// //     if (err) throw err;
// //     console.log(result.name);
// //     db.close();
// //   });
// // });



// // app.listen(PORT, HOST);
// // console.log(`Running on http://${HOST}:${PORT}`);