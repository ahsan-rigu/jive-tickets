import { Schema, model, Document } from 'mongoose';

interface ITicket extends Document {
    event: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    tier: Schema.Types.ObjectId; 
    qrCode: string;
    purchaseDate: Date;
    pricePaid: number; 
    isValid: boolean;
}

const ticketSchema = new Schema<ITicket>({
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tier: { type: Schema.Types.ObjectId, ref: 'TicketTier', required: true },
    qrCode: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
    pricePaid: { type: Number, required: true },
    isValid: { type: Boolean, default: true }
});

const Ticket = model<ITicket>('Ticket', ticketSchema);
export default Ticket;
