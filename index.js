import express from 'express';
import cors from 'cors';
const port = process.env.PORT || 3001;
import router from './routes/routes.js';
import db from './database/config.js';

const app = express();

app.use(express.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(router);



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});