const knex = require('../connection')

const cadastrandoUsuario = (usuario) => {
    const { username, senhaCriptografada } = usuario

    const usuarioCadastrado = knex('usuario')
        .insert({
            usuario: username,
            senha: senhaCriptografada
        })
        .returning('*')

    return usuarioCadastrado
}

module.exports = cadastrandoUsuario