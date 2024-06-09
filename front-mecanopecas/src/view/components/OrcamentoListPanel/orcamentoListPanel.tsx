import React from 'react';
import {
    OrcamentoListPanelContainer,
    Card,
    OrcamentoName,
    OrcamentoInfo,
    OrcamentoDetails,
} from './orcamentoListPanel.styles';
import { OrcamentoResponseDTO } from '../../../dtos/response/orcamentoResponseDTO';

const OrcamentoListPanel = ({ orcamentos }: { orcamentos: OrcamentoResponseDTO[] }) => {
    return (
        <OrcamentoListPanelContainer>
            <h2>Orçamentos</h2>
            {orcamentos.map((orcamento) => (
                <Card key={orcamento.id}>
                    <OrcamentoInfo>
                        <OrcamentoName>{orcamento.codigo}</OrcamentoName>
                        <OrcamentoDetails><strong>Data: </strong> {new Date(orcamento.dataOrcamento).toLocaleDateString()}</OrcamentoDetails>
                        <OrcamentoDetails><strong>Data de Expiração: </strong> {new Date(orcamento.dataExpiracao).toLocaleDateString()}</OrcamentoDetails>
                        {orcamento.status === "Expirado" && <OrcamentoDetails><strong>Status: </strong><span style={{ color: "red" }}>{orcamento.status}</span></OrcamentoDetails>}
                        {orcamento.status === "Finalizado" && <OrcamentoDetails><strong>Status: </strong><span style={{ color: "green" }}>{orcamento.status}</span></OrcamentoDetails>}
                        {orcamento.status === "Aberto" && <OrcamentoDetails><strong>Status: </strong><span style={{ color: "blue" }}>{orcamento.status}</span></OrcamentoDetails>}
                    </OrcamentoInfo>
                </Card>
            ))}
        </OrcamentoListPanelContainer>
    );
};

export default OrcamentoListPanel;
