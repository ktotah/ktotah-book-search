require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connection to MongoDB successful');
  mongoose.disconnect();
})
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});