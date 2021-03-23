const express = require("express");
const app = express();
const cors = require('cors');
const cp = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const port = process.env.PORT || 8080;

const userRoutes = require('./routes/User');
const postRoutes = require("./routes/Post");
const actividadesRoutes = require("./routes/Actividades");
const ayudasRoutes = require("./routes/Ayuda");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cp());
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/actividades', actividadesRoutes);
app.use('/ayudas', ayudasRoutes);

app.listen(port);