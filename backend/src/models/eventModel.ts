import { Schema, model, Document } from "mongoose";

interface ITier {
  name: string;
  ticketsAvailable: number;
  price: number;
  discountPercentage: number;
}

interface ILocation {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  mapLink?: string;
}

interface IEvent extends Document {
  name: string;
  description: string;
  date: Date;
  location: ILocation;
  ticketTiers: ITier[];
  host: Schema.Types.ObjectId;
}

const locationSchema = new Schema<ILocation>({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
  },
});

const tierSchema = new Schema<ITier>({
  name: {
    type: String,
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
});

const eventSchema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  ticketTiers: {
    type: [tierSchema],
    required: true,
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Event = model("Event", eventSchema);
export default Event;
