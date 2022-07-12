const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded( {extended: true}));
app.use(express.json());

const recipeRoutes = require('./routes/recipesRoutes.js')

app.use('/api', recipeRoutes);

require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
   });

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', DB_URI => console.log('Database Connected'))

app.get('/', (req, res) => {
    res.send('It has been connected')
})

app.listen(port, () => console.log(`Listening on port ${port}`));



