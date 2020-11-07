const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

// Routes
const userRoutes = require('./routes/User');
const postRoutes = require("./routes/Post");
const actividadesRoutes = require("./routes/Actividades");
const ayudasRoutes = require("./routes/Ayuda");

app.use(cors()); // CORS

// Body parser for methods that sends body in their requests.
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true})); // application/x-www-form-urlencoded

// Route list
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/actividades', actividadesRoutes);
app.use('/ayudas', ayudasRoutes);

app.listen(port, function(req, res){
    console.log(`Listening on http://localhost:${port}...`);
});
