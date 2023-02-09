const express = require('express');
require('dotenv').config();
const { middlewares } = require('./middlewares/middleware.index');

const app = express();
app.use(express.json());
const apiRoutes = require('./routes');

middlewares(app);

app.use('/', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log('Server is listening..', PORT); });
