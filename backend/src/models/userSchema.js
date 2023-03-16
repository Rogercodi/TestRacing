import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
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

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
