const setupServer = require('./setup-server');
const app = setupServer();
const Entry = require('./models/Entry');

app.get('/news', (req, res) => {
  Entry.find()
    .then(entry => res.json(entry))
    .catch(err => err.json({ errors: [err] }));
});

app.post('/news', (req, res) => {
  Entry.create(req.body)
    .then(entry => res.status(201).json(entry))
    .catch(err => res.status(500).json(err));
  console.log('Successful');
});
