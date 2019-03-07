const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoURI = 'mongodb://localhost:27017/mymappins';

mongoose.connect(mongoURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongo DB is connected and running @ ' + mongoURI);
});

const pinsSchema = mongoose.Schema({
  id: Number,
  note: String,
  position: {
    lat: Number,
    lng: Number
  },
  pinCount: Number
});

const pins = mongoose.model('pins', pinsSchema);

module.exports.pins = pins;
module.exports.db = db;
