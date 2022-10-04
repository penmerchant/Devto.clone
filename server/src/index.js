const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PostRoute = require('./routes/posts/postRoute');
const CommentRoute = require('./routes/comments/comment');
const UserRoute = require('./routes/users/user');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOD);

app.get('/', (req, res) => {
  res.json('welcome to express app');
});

app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/api/posts/', PostRoute);
app.use('/api/comments/', CommentRoute);
app.use('/api/user/', UserRoute);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
