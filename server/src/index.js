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

// const mongodb = process.env.mongod;
const ATLAS_CONN = process.env.MONGODB;

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

mongoose.connect(ATLAS_CONN);

app.get('/', (req, res) => {
  res.json('welcome to express app');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
