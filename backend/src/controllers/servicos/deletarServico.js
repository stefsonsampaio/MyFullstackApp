const deletandoServico = require('../../query/servico/deletandoServico')

const deletarServico = async (req, res) => {
    const { id_valor } = req.body 
    const { id } = req.params

    if (!id || !id_valor) {
        return res.status(400).json('Id não informado na requisição')
    }

    try {
        const servicoDeletado = await deletandoServico(id_valor) 
        
        if (!servicoDeletado) {
            return res.status(400).json('Nada foi deletado')
        }

        return res.status(204).json('Objeto deletado com sucesso')
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = deletarServico