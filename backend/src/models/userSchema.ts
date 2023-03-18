import mongoose, { model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
mongoose.set('strictQuery', false);

export interface MongoDbUser {
  _id:  Types.ObjectId,
  nombre: string;
  email: string;
  password: string;
  sessions: Types.ObjectId[];
  vehiculos: Types.ObjectId[];
  encryptPassword: (password: string) => Promise<string>;
  matchPassword: (password: string) => Promise<string>;
}

const userSchema = new mongoose.Schema<MongoDbUser>({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
  ],
  vehiculos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
},
  {
    timestamps: false,

  }
);

userSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<MongoDbUser>("user", userSchema);
