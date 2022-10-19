const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;


const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const db = require("../models/");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});