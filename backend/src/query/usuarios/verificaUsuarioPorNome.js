const knex = require('../connection')

const verificaUsuarioPorName = async (username) => {
    const usuarioExistente = await knex('usuario')
        .select('*')
        .where('usuario', username)

    return usuarioExistente
}

module.exports = verificaUsuarioPorName