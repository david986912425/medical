const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path')

// swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Farmacia Medical Testing',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:9000',
            },
            {
                url: 'https://startling-gelato-ce4e1f.netlify.app',
            },
            {
                url: 'https://vigorously-grand-ewe.ngrok-free.app',
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}

// settings
const app = express();
app.disable("x-powered-by");
const port = process.env.PORT || 81;

const whitelist = [
    'https://medical-farmacy.netlify.app/',
    'http://localhost:3000',
    'http://localhost:9000',
];

let corsOptions = {};

if (process.env.URL_FRONTEND) {
  corsOptions.origin = process.env.URL_FRONTEND;
}

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

// Rutas
app.use('/api/products', require('./routes/product'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/category', require('./routes/category'));

// routes
app.get('/', (req, res) => {
    res.send('Bienvenido al backend de Medical')
})

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
    })
    .catch((err) => {
        console.error('No se pudo conectar:', err.message);
    });

app.listen( port, () => console.log(`Servidor escuchando en puerto: ${port}`));