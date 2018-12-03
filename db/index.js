const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/fec', { useNewUrlParser: true }).then(console.log('mongoose connected!'));
const mongoURI = 'mongodb://localhost:27017/mvp';
// const mongoURI = 'mongodb+srv://steve:102884@su-casa-t1n9r.mongodb.net/fec';
mongoose.connect(mongoURI, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongo DB is connected and running @ ' + mongoURI);
});

const pinsSchema = mongoose.Schema({
  note: String,
  position: {
    lat: Number,
    lng: Number
  }
});

const pins = mongoose.model('pins', pinsSchema);

module.exports.pins = pins;
module.exports.db = db;
