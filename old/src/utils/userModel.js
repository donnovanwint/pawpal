import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,
  googleId: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
