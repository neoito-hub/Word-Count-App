import mongoose from 'mongoose';

const LetterSchema = new mongoose.Schema(
  {
    user: {
      type: String
    },
    word: {
      type: String,
      required: true
    },
    frequency: {
      type: Number
    }
  },
  { versionKey: false }
);

export default mongoose.model('word', LetterSchema);
