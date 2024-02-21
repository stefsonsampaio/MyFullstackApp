const buscaTipoServicoPorDesc = require('../../query/atendimentos/buscaTipoServicoPorDesc')
const buscaIdValor = require('../../query/atendimentos/buscaIdValor')
const adicionaServico = require('../../query/atendimentos/adicionaServico')
const verificaTempoValido = require('../../query/atendimentos/verificaTempoValido')
const verificaFuncPorNome = require('../../query/funcionarios/verificaFuncPorNome')
const verificaFuncDemitido = require('../../query/funcionarios/verificaFuncDemitido')

const registrarAtendimento = async (req, res) => {
    const { nome_funcionario, clientName, selectedService } = req.body
    console.log(nome_funcionario, clientName, selectedService)
    const { id } = req.params

    if (!clientName || !selectedService || !nome_funcionario) {
        return res.status(400).json('Preencha os campos de cliente e serviço')
    }

    try {
        const idTipoServico = await buscaTipoServicoPorDesc(selectedService)
        if (!idTipoServico) {
            return res.status(400).json('O serviço informado não foi encontrado')
        }

        const funcionario = await verificaFuncPorNome(nome_funcionario)
        if (!funcionario) {
            return res.status(400).json('O funcionário informado não foi encontrado')
        }

        const validaFuncionario = await verificaFuncDemitido(funcionario.id_funcionario)
        if (!validaFuncionario) {
            return res.status(400).json('O usuário selecionado foi demitido')
        }

        const aprovado = await verificaTempoValido(id, funcionario.id_funcionario, idTipoServico.id_tipo_servico, clientName)
        if (aprovado[0]) {
            return res.status(400).json('Esse corte foi registrado há dois minutos!')
        }

        const idValor = await buscaIdValor(idTipoServico.id_tipo_servico)
        const servico = await adicionaServico(id, funcionario.id_funcionario, idTipoServico.id_tipo_servico, idValor[0].id_valor, clientName)

        const novoServico = {
            clientName,
            selectedService,
            timestamp: servico.data_hora,
            nome_funcionario
        }

        return res.status(201).json(novoServico)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = registrarAtendimento