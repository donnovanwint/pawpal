import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  gender: String,
  ownerEmail: String,
});

export default mongoose.models.Pet || mongoose.model('Pet', petSchema);
