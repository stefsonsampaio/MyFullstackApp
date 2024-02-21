require('dotenv').config()
const jwt = require('jsonwebtoken')
const senhaJWT = process.env.JWT_PWD
const verificaUsuarioPorId = require('../query/usuarios/verificaUsuarioPorId')

const auth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json('Para acessar o recurso, é necessário token de autorização')
    }

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, senhaJWT)
        const user = await verificaUsuarioPorId(id)

        if (!user) {
            return res.status(401).json('Para acessar esse recurso, é necessário um token válido')
        }

        delete user[0].senha
        req.userario = user[0]
        
        next()
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json('É necessário um token válido para acessar esse recurso')
        }
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = auth