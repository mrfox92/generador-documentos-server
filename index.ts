import Server from './classes/server';

import cors from 'cors';
import mongoose from 'mongoose';
import trabajoRoutes from './routes/trabajo';
import detalleTrabajoRoutes from './routes/detalleTrabajo';
import clienteRoutes from './routes/cliente';
import bodyParser = require('body-parser');

//  declaro una instancia de mi clase server
const server = new Server();
//  configuramos bodyparser para trabajar con objetos javascript
server.app.use( bodyParser.urlencoded({ extended: true }) );
//  transformamos toda la información recibida a json
server.app.use( bodyParser.json() );


//  configuracion CORS
server.app.use( cors({ origin: true, credentials: true }) );

//  rutas de mi app
server.app.use('/cliente', clienteRoutes);
server.app.use('/trabajo', trabajoRoutes);

server.app.use('/detalle', detalleTrabajoRoutes);

//  conectar DB
mongoose.connect('mongodb://localhost:27017/pdfgenerator', { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

    if ( err ) throw err;

    console.log('base de datos ONLINE');
});
//  escuchamos las peticiones
server.start();