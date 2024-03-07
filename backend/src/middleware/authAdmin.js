require('dotenv').config()
const jwt = require('jsonwebtoken')
const verificaUsuarioPorId = require('../query/usuarios/verificaUsuarioPorId')
const senhaJWT = process.env.JWT_PWD

const authAdmin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json('Para acessar o recurso, é necessário token de autorização')
    }
    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, senhaJWT)
        const user = await verificaUsuarioPorId(id)

        if (user[0].usuario_liberado !== 'S') {
            return res.status(401).json('Somente o admin pode acessar essa rota')
        }

        next()
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json('É necessário um token válido para acessar esse recurso')
        }
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = authAdmin