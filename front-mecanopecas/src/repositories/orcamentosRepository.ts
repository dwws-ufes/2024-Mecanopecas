import api from './api.ts';

const orcamentosRepository = {
    createOrcamento(orcamento) {
        return api.post('/orcamentos', orcamento);
    },
    getOrcamento(id) {
        return api.get(`/orcamentos/${id}`);
    },
    getAllOrcamentos() {
        try {
            return api.get('/orcamentos');
        } catch (error) {
            console.error(error);
        }
    },
    addPecaToOrcamento(orcamentoId, peca) {
        return api.post(`/orcamentos/${orcamentoId}/pecas`, peca);
    },
    removePecaFromOrcamento(orcamentoId, pecaId) {
        return api.delete(`/orcamentos/${orcamentoId}/pecas/${pecaId}`);
    },
    applyDescontoToOrcamento(orcamentoId, descontoPercentual) {
        return api.put(`/orcamentos/${orcamentoId}/desconto`, null, {
            params: {descontoPercentual},
        });
    },
    createVenda(orcamentoId) {
        return api.post(`/orcamentos/${orcamentoId}/venda`);
    },
};

export default orcamentosRepository;