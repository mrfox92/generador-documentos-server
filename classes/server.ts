import express from 'express'

export default class Server {


    public app: express.Application;
    public port: number = 3000;

    constructor() {
        //  se inicializa el servidor de express
        this.app = express();
    }

    //  escuchar las peticiones que se realicen al puerto especificado
    start ( ) {

        this.app.listen( this.port, () => console.log(`Server listening on port: ${ this.port }`) );
    }
}