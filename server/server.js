const express = require('express');
const bodyParser = require('body-parser');

const { pins, db } = require('../db/index.js');
const path = require('path');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname + '/../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/pins', (req, res) => {
  pins.find({}).exec((err, data) => {
    if (err) {
      console.log('GET request ERROR = ', err);
    }
    res.status(200).send(data);
  });
});

app.post('/pins', (req, res) => {
  pins.create(req.body, err => {
    if (err) {
      console.log('mongo create error = ', err);
    }
    console.log('entry added to mongo = ', req.body);
  });
});

app.patch('/pins/:id', (req, res) => {
  let id = req.body.id;
  let updatedNote = req.body.note;
  pins.findOneAndUpdate({id: id}, {note: updatedNote})
    .exec(() => {
    res.status(204);
    console.log('note property updated for document with id=', id);
    });
});

app.delete('/pins/:id', (req, res) => {
  let id = req.body.id;
  pins.find({id: id})
    .remove()
    .exec(() => {
      res.status(202);
      console.log('document with id=', id, ' successfully deleted');
    });
});


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
