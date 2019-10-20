import { Schema, model, Document } from 'mongoose';


const clienteSchema = new Schema({
    nombre: {
        type: String
    },
    numContacto: {
        type: Number
    }

});

//  interface para ayudarnos con el tipado del lado de typescript
interface ICliente extends Document {
    nombre: string;
    numContacto: number;
}

//  exportamos el modelo
export const Cliente = model<ICliente>('Cliente', clienteSchema);