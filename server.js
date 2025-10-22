const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


const conexao = require('./src/db/conexao')

//Middleware
app.use(cors());
app.use(express.json());


//Servir os arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Pagina teste
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
});

//Servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
