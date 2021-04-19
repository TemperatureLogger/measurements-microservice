// pentru centralizarea rutelor
// are ca rol captarea tuturor rutelor din fiecare director

const Router = require('express').Router();

const measurementsController = require ('./measurements/controllers.js');

Router.use('/measurements', measurementsController);

// folosit in start.js
module.exports = Router;
