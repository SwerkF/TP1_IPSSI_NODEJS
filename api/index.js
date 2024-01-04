const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const commentaireRoutes = require('./routes/commentaireRoutes');
const technologieRoutes = require('./routes/technologieRoutes');

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

// Configuration des routes
app.use('/api/users', userRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/technologies', technologieRoutes);


// Configuration du port d'écoute
app.listen(3000, () => {
    console.log('Server started');
});
