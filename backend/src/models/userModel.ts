import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  hostedEvents: Schema.Types.ObjectId[];
  joinedEvents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  hostedEvents: {
    type: [Schema.Types.ObjectId],
    ref: "Event",
  },
  joinedEvents: {
    type: [Schema.Types.ObjectId],
    ref: "Event",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);
export default User;
