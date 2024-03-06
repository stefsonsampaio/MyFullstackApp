const verificaUsuarioPorName = require("../../query/usuarios/verificaUsuarioPorNome")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJWT = process.env.JWT_PWD

const logarUsuario = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json('Preencha  as informações necessárias')
    }

    try {
        const usuario = await verificaUsuarioPorName(username)

        if (!usuario.length) {
            return res.status(401).json(`Usuário ${username} não existe.`)
        }

        const comparaSenha = await bcrypt.compare(password, usuario[0].senha)

        if (!comparaSenha) {
            return res.status(401).json('Usuário ou senha incorreta')
        }

        const token = jwt.sign({ id: usuario[0].id_usuario }, senhaJWT, {
            expiresIn: '8h',
        })

        delete usuario[0].senha

        return res.status(201).json({ usuario: usuario[0], token})
    } catch (error) {
        console.log(error.message) 
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = logarUsuario
