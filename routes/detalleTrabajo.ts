import { Router, Request, Response } from "express";
import { DetalleTrabajo } from '../models/detalle_trabajo';
import { Trabajo } from '../models/trabajo';

const detalleTrabajoRoutes = Router();

//  Obtener todo los detalles de un trabajo a partir del ID de trabajo

detalleTrabajoRoutes.get('/:id', ( req: Request, res: Response ) => {

    const trabajoId = req.params.id;

    DetalleTrabajo.find({ trabajo: trabajoId }).exec( ( err, detalleDB ) => {

        if ( err ) {

            return res.json({
                ok: false,
                err
            });

        }

        if ( !detalleDB ) {

            return res.json({
                ok: false,
                mensaje: `No detalle para el trabajo con ID: ${ trabajoId }`
            });

        }

        //  obtenemos la informacion del trabajo
        Trabajo.findById(trabajoId).exec( ( err, trabajoDB ) => {

            //  enviamos todo los detalles
            res.json({
                ok: true,
                trabajo: trabajoDB,
                detalle: detalleDB
            });

        });
        

    });

});
//  ingresar un nuevo detalle de un trabajo a partir del ID de un trabajo existente
detalleTrabajoRoutes.post('/:id', ( req: Request, res: Response ) => {

    const body = req.body;
    //  obtener el id del trabajo
    const trabajoId = req.params.id;
    //  verificamos si existe un trabajo con ese ID
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
                mensaje: `No existe trabajo ingresado con el ID: ${ trabajoId }`
            });
        }

        //  agregamos el id trabajo al body
        body.trabajo = trabajoId;
        //  creamos el detalle trabajo

        DetalleTrabajo.create( body ).then( async detalleTrabajoDB => {
    
            res.json({
                ok: true,
                detalleTrabajo: detalleTrabajoDB
            });
    
        }).catch( err => {
    
            res.json({
                ok: false,
                err
            });
    
        });


    });


});

//  Actualizar estado de un detalle por su id y su propiedad status
detalleTrabajoRoutes.put('/updateStatus/:id', ( req:Request, res: Response ) => {
    //obtenemos el id del detalle
    const idDetalle = req.params.id;
    const estado = req.body.status;

    DetalleTrabajo.findOneAndUpdate( { _id: idDetalle }, { status: estado }, ( err, detalleDB ) => {
        if ( err ) {
            return res.json({
                ok: false,
                err
            });
        }

        if ( !detalleDB ) {
            return res.json({
                ok: false,
                message: 'No se ha podido actualizar estado detalle con ese ID'
            });
        }

        res.json({
            ok: true,
            detalle: detalleDB
        })
    })
});

export default detalleTrabajoRoutes;