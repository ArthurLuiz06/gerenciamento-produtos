function verificarPermissaoAdmin(req, res, next) {
    if (!req.session || !req.session.usuario) { 
        return res.status(401).send('Acesso não autorizado. Por favor, faça login.');
    }
   
    if(!req.session || req.session.tipo != 'admin') { 
        console.log('Acesso negado: Tentativa de acesso à área ADM sem permissão.')

        return res.status(403).send( 'Acesso proibido. Você não tem permissão para acessar esta área.');
    }

    next()
}

module.exports = {verificarPermissaoAdmin};