import { Router, Request, Response } from "express";
import { Trabajo } from '../models/trabajo';    //  importamos nuestro modelo

const trabajoRoutes = Router();

//  Obtener todos los trabajos
trabajoRoutes.get('/', ( req: Request, res: Response ) => {

    Trabajo.find({}).exec( ( err, trabajosDB ) => {

        if ( err ) {

            return res.json({
                ok: false,
                err
            });
        }

        if ( !trabajosDB ) {

            return res.json({
                ok: false,
                mensaje: 'No existen trabajos de momento'
            });
        }

        res.json({
            ok: true,
            trabajos: trabajosDB
        });

    });
});

//  obtener un trabajo en especifico por su ID
trabajoRoutes.get('/:id', ( req: Request, res: Response ) => {

    const trabajoId = req.params.id;
    //  buscamos el trabajo por el id recibido como parametro
    Trabajo.findById(trabajoId).exec( ( err, trabajoDB ) => {

        if ( err ) {

            return res.json({
                ok: false,
                err
            });
        }

        if ( !trabajoDB ) {

            return res.json({
                ok: false,
                mensaje: `No existe trabajo con el ese Id`
            });
        }

        res.json({
            ok: true,
            trabajo: trabajoDB
        });
    });
});
//  obtener todos los trabajos a partir del ID de un cliente

trabajoRoutes.get('/find/:id', ( req: Request, res: Response ) => {
    const idCliente = req.params.id;
    //  buscar si el id de cliente es un ID válido

    Trabajo.find({ cliente: idCliente }).exec().then( trabajosClienteDB => {

        if ( !trabajosClienteDB ) {

            return res.json({
                ok: false,
                mensaje: `Sin trabajos agregados`
            })
        }

        res.json({
            ok: true,
            trabajosCliente: trabajosClienteDB
        })

    }).catch( err =>{

        res.json({
            ok: false,
            err
        })

    });

});

//  Buscar trabajo por su nombre
trabajoRoutes.post('/buscar/:busqueda', ( req: Request, res: Response ) => {
    const busqueda = req.params.busqueda;
    //  establecemos la busqueda
    let regex = new RegExp( busqueda, 'i' );
    Trabajo.find({ title: regex }).exec( ( err, resultadoDB ) => {

        if ( err ) {

            return res.json({
                ok: false,
                err
            });
        }

        if ( !resultadoDB ) {

            return res.json({
                ok: false,
                mensaje: 'Sin resultados'
            });
        }


        res.json({
            ok: true,
            resultado: resultadoDB
        });

    });

});


//  ingresar un nuevo trabajo
trabajoRoutes.post('/create/:id', ( req: Request, res: Response ) => {
    //  obtenemos la data que viene desde el formulario
   const body = req.body;
   body.cliente = req.params.id;
   //   guardamos la data en la BD
   Trabajo.create( body ).then( async trabajoDB => {
       //   enviamos la respuesta
       res.json({
           ok: true,
           trabajo: trabajoDB
       });

   }).catch( err => {

       res.json({
           ok: false,
           err
       });

   });
});

//  Actualizar informacion de un trabajo a partir de su ID
trabajoRoutes.post('/update/:id', ( req: Request, res: Response ) => {

    const idTrabajo = req.params.id;
    //  traemos el registro de la base de datos
    Trabajo.findById(idTrabajo).exec( ( err, trabajoDB ) => {

        if ( err ) {

            return res.json({
                ok: false,
                err
            });
        }

        if ( !trabajoDB ) {

            return res.json({
                ok: false,
                mensaje: 'No existe un trabajo con ese ID'
            });
        }

        //  dejamos establecidas las propiedades con valores por defecto

        const trabajo = {

            title:          req.body.title          ||  trabajoDB.title,
            description:    req.body.description    ||  trabajoDB.description,
            annotation:     req.body.annotation     ||  trabajoDB.annotation,
            total:          req.body.total          ||  trabajoDB.total,
            cliente:        req.body.cliente        ||  trabajoDB.cliente 
            
        };

        //  actualizamos los datos
        Trabajo.findByIdAndUpdate( idTrabajo, trabajo, { new: true }, ( err, trabajoUpdated ) => {
            
            res.json({

                ok: true,
                mensaje: 'Datos actualizados exitosamente',
                trabajo: trabajoUpdated
            });

        });
    });
});


export default trabajoRoutes;