import { Router, Request, Response } from 'express';
import { Cliente } from '../models/cliente';


const clienteRoutes = Router();

//  Listar clientes
clienteRoutes.get('/', ( req: Request, res: Response ) => {
    Cliente.find({}).exec().then( clientes => {

        res.json({
            ok: true,
            clientes
        })

    }).catch( err => {

        res.json({
            ok: false,
            err
        })
    })
});
//  Crear cliente
clienteRoutes.post('/create', ( req: Request, res: Response ) => {
    const body = req.body;

    Cliente.create( body ).then( async clienteDB => {

        res.json({
            ok: true,
            cliente: clienteDB
        })

    }).catch( err => {

        res.json({
            ok: false,
            err
        })

    });
});
//  Actualizar informacion cliente
clienteRoutes.put('/update/:id', ( req: Request, res: Response ) => {
    //  obtener el ID
    const idCliente = req.params.id;
    //  buscamos si existe un cliente con ese ID
    Cliente.findById(idCliente).exec().then( (clienteDB: any) => {

        if ( !clienteDB ) {
                
            return res.json({
                ok: false,
                message: 'No existe un cliente con ese ID'
            })    
        }

        const cliente = {
            nombre:             req.body.nombre ||  clienteDB.nombre,
            numContacto: req.body.numContacto   ||  clienteDB.numContacto
        }
        //  actualizamos sus datos del cliente

        Cliente.findByIdAndUpdate(idCliente, cliente, { new: true } ).exec().then( clienteUpdated => {

            res.json({
                ok: true,
                cliente: clienteUpdated
            })

        }).catch( err => {
            //respondemos y enviamos el error
            res.json({
                ok: false,
                err
            })    
        });

    }).catch( err => {
        //respondemos y enviamos el error
        res.json({
            ok: false,
            err
        })
    })

});
//  Eliminar cliente

clienteRoutes.delete('/delete/:id', ( req: Request, res: Response ) => {

    const idCliente = req.params.id;
    //  buscamos el registro por su id y lo eliminamos
    Cliente.findByIdAndDelete(idCliente).exec().then( clienteDeleted => {

        if ( !clienteDeleted ) {
            res.json({
                ok: false,
                message: 'El cliente que desea eliminar no existe o el ID no es valido'
            })    
        }

        res.json({
            ok: true,
            cliente: clienteDeleted
        })

    }).catch( err => {

        res.json({
            ok: false,
            err
        })

    })
});
//  Obtener cliente a partir de su id
clienteRoutes.get('/:id', ( req: Request, res: Response ) => {

    const idCliente = req.params.id;
    Cliente.findById(idCliente).exec().then( clienteDB => {

        if ( !clienteDB ) {
            res.json({
                ok: false,
                message: 'No se encontro cliente con ese ID'
            })
        }

        res.json({
            ok: true,
            cliente: clienteDB
        })

    }).catch( err => {

        res.json({
            ok: false,
            err
        })
    })

})

//  Buscar cliente por su nombre
clienteRoutes.get('/buscar/:busqueda', ( req: Request, res: Response ) => {

    const busqueda = req.params.busqueda;
    let regex = new RegExp( busqueda, 'i' );
    Cliente.find({ nombre: regex }).exec().then( busquedaDB => {

        if ( !busqueda ) {

            res.json({
                ok: false,
                message: 'Sin resultados'
            })
        }

        res.json({
            ok: true,
            busquedaCliente: busquedaDB
        })

    }).catch( err => {
        
        res.json({
            ok: false,
            err
        })
    })

})
//  exportamos las rutas
export default clienteRoutes;