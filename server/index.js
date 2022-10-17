const express = require('express');
const cors = require('cors');
const port = 3001;


const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })