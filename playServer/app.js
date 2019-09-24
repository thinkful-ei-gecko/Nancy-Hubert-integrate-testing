const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const store = require('./play-store.js');

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;

  let filteredApps = [...store];

  if (genres) {
    filteredApps = store.filter(app =>
      app.Genres.toLowerCase().includes(genres.toLowerCase())
    );
  }

  if ('sort' in req.query) {
    console.log('sort has no value');
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Must sort on rating or app name');
    }
  }

  if (sort) {
    filteredApps.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(filteredApps);
});

app.listen(8000, () => {
  console.log('listening');
});
