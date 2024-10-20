import { Schema, model, Document } from "mongoose";

interface ITicketTier extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  price: number;
  description?: string;
  availableTickets: number;
  discountPercentage?: number;
  eventId: Schema.Types.ObjectId;
}

const ticketTierSchema = new Schema<ITicketTier>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  availableTickets: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

const TicketTier = model<ITicketTier>("TicketTier", ticketTierSchema);
export default TicketTier;
