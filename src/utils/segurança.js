const {URL} = require('url');

const HOSTS_PERMITIDOS = [
    'localhost:8080'
];

function validarRedirecionamento(req, res, next) {
    const destinoUrl = req.query.url;
    if(!destinoUrl) return next();

    try{
        const urlObj = new URL(destinoUrl);

        if(!HOSTS_PERMITIDOS.includes(urlObj.host)) {
            return res.status(400).end(`Erro: Redirecionamento não suportado para o host: ${urlObj.host}`);
        }

        next()
    } catch(e) {
        return res.status(400).end(`URL de redirecionamento inválida: ${destinoUrl}`)
    }
}

module.exports = {validarRedirecionamento};