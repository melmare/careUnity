const setupServer = require('./setup-server');
const app = setupServer();

const UserGroup = require('./models/UserGroup');

app.get('/news', (req, res) => {
  News.find()
    .then(entries => res.json(entries))
    .catch(err => res.json(err));
});

app.post('/news', (req, res) => {
  News.create(req.body)
    .then(entry => res.json(entry))
    .catch(err => res.json(err));
});

app.patch('/news/:id', (req, res) => {
  const { id } = req.params;
  News.findByIdAndUpdate(id, req.body, { new: true })
    .then(entry => res.json(entry))
    .catch(err => res.json(err));
});

app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.post('users', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.get('/usergroups', (req, res) => {
  UserGroup.find()
    .then(userGroups => res.json(userGroups))
    .catch(err => res.json(err));
});

app.post('/usergroups', (req, res) => {
  UserGroup.create(req.body)
    .then(userGroup => res.json(userGroup))
    .catch(err => res.json(err));
});

app.patch('/usergroups/:id', (req, res) => {
  const { id } = req.params;
  UserGroup.findByIdAndUpdate(id, req.body, { new: true })
    .then(usergroup => res.json(usergroup))
    .catch(err => res.json(err));
});
