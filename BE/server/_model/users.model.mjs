import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    result: {}
  },
  { versionKey: false }
);

export default mongoose.model('user', UserSchema);
