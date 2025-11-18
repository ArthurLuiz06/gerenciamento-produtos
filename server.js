const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


const conexao = require('./src/db/conexao')

//Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());


//Servir os arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Importar rotas Cadastro
const usuarioRoutes = require('./src/routes/cadastrar-usuario')
app.use(usuarioRoutes);

// Importar rotas Login
const loginRoutes = require('./src/routes/login-usuario')
app.use(loginRoutes)

// Importar pagina de produtos-usuarios
const produtosUsuarios = require('./src/routes/produtos-usuarios')
app.use(produtosUsuarios)

// Importar pagina de produtos-adm
const produtosAdm = require('./src/routes/produtos-adm')
app.use(produtosAdm)


// Pagina Login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'usuario-login.html'))
});

// Pagina de Cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'usuario-cadastro.html'))
})

//Pagina de Produtos-Usuario
app.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'produtos-usuario.html'));
});

// Pagina de produtos-adm
app.get('/admin/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'produtos-adm.html'))
})


//Servidor
app.listen(8080, () => console.log('Servidor rodando em http://localhost:8080'));
