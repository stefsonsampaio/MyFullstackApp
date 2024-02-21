const bcrypt = require('bcrypt')

const Encriptador = (senha) => {
    const senhaCriptografada = bcrypt.hash(senha, 10)

    return senhaCriptografada
}

module.exports = Encriptador