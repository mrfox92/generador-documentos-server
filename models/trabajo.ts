import { Schema, model, Document } from 'mongoose';

const trabajoSchema = new Schema({

    createdAt: {
        type: Date
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    annotation: {
        type: String
    },
    total: {
        type: Number
    },
    cliente: {
        type: Schema.Types.ObjectId, ref: 'Cliente'
    }

});

//  crear metodo para evaluar el estado de el esquema de trabajo, el cual sera verdadero cuando todas las tareas esten en verdadero

//  inicializamos la fecha en la propiedad createdAt antes de guardar en la base de datos
trabajoSchema.pre<ITrabajo>('save', function( next ){
    this.createdAt = new Date();
    next();
});

//  para ayudarnos a que typescript reconozca los tipos de datos nos creamos una interface en donde los establecemos
interface ITrabajo extends Document {
    createdAt: Date;
    title: string;
    description: string;
    annotation: string;
    status: boolean;
    total: number;
    cliente: string;
}

//  Exportamos nuestro modelo e indicamos el esquema
export const Trabajo = model<ITrabajo>('Trabajo', trabajoSchema);