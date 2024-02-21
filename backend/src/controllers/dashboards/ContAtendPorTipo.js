const contaAtendPorTipo = require('../../query/dashboard/contaAtendPorTipo')

const ContAtendPorTipo = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('Informe o ID')
    }

    try {
        const quantidades = await contaAtendPorTipo(id)

        if (!quantidades[0]) {
            return res.status(200).json('Sem atendimentos realizados ainda')
        }

        return res.status(200).json(quantidades)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = ContAtendPorTipo