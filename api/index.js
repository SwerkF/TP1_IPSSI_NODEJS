const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Initialisation de l'application express
const app = express();

// Configuration du CORS
app.use(cors());

// Configuration du body-parser
app.use(bodyParser.json());

// Configuration de la route par défaut
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Utiliser APIRouter
app.use('/api/', apiRouter);

// Configuration du port d'écoute
app.listen(3000, () => {
    console.log('Server started');
});


