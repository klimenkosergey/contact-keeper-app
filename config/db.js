const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoURI');

const initDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('Connected to Database');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = initDB;
