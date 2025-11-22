const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session')
const app = express();

const conexao = require('./src/db/conexao')
const {validarRedirecionamento} = require('./src/utils/segurança')
const {verificarPermissaoAdmin} = require('./src/utils/segurança_admin')

//Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// Precisa vir ANTES das rotas
app.use(session({
  secret: "meuServidor_BackEnd_2025_!@#xA92",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(validarRedirecionamento);

// rota de logout
const logoutRoute = require('./src/routes/logout');
app.use(logoutRoute);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use(require('./src/routes/cadastrar-usuario'));
app.use(require('./src/routes/login-usuario'));
app.use(require('./src/routes/produtos-usuarios'));
app.use(require('./src/routes/produtos-adm'));

// Rotas de páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'usuario-login.html'))
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'usuario-cadastro.html'))
});

app.get('/produtos', (req, res) => {
    if(!req.session || !req.session.usuario) {
        return res.redirect('/erro401.html')
    }
    res.sendFile(path.join(__dirname,'views','produtos-usuario.html'))
});

app.get('/admin/produtos', verificarPermissaoAdmin, (req, res) => {
    res.sendFile(path.join(__dirname,'views','produtos-adm.html'))
});

app.listen(8080, () => console.log('Servidor rodando em http://localhost:8080'));
