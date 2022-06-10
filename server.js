const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
mongoose.connect(DB).then(() => console.log('DB connection successful'));
const server = app.listen(port, () => {
  console.log(`App running on port ${port}. . .`);
});
