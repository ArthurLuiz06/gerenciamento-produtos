function verificarPermissaoAdmin(req, res, next) {
    if(!req.session || req.session.tipo != 'admin') { 
        console.log('Acesso negado: Tentativa de acesso à área ADM sem permissão.')

        return res.redirect('/erro403.html')
    }

    next()
}

module.exports = {verificarPermissaoAdmin};