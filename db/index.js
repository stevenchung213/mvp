const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/fec', { useNewUrlParser: true }).then(console.log('mongoose connected!'));
const mongoURI = 'mongodb://localhost/mvp';
// const mongoURI = 'mongodb+srv://steve:102884@su-casa-t1n9r.mongodb.net/fec';
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoose connected!'));

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongo DB is connected and running @ ' + mongoURI);
});

const pinmapSchema = mongoose.Schema({
  userid: Number,
  note: String,
  location: String
});

const pinmap = mongoose.model('pinmap', pinmapSchema);

module.exports.pinmap = pinmap;
module.exports.db = db;
