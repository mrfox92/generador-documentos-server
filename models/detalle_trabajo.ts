import { Schema, model, Document } from 'mongoose';

const detalleTrabajoSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    trabajo: {
        type: Schema.Types.ObjectId, ref: 'Trabajo'
    }
});

interface IDetalleTrabajo extends Document {
    title: string;
    description: string;
    status: boolean;
    trabajo: string;
}


export const DetalleTrabajo = model<IDetalleTrabajo>('DetalleTrabajo', detalleTrabajoSchema);

