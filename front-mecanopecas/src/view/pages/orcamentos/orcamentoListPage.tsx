import React from 'react';
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { Container, Content, HeaderContainer, FooterContainer, GridContainer, Card, OrcamentoName, OrcamentoInfo, OrcamentoDetails, OrcamentoActions, AddButton } from './orcamentoListPage.styles';
import { useOrcamentos } from '../../../hooks/orcamentoHooks';
import { OrcamentoResponseDTO } from '../../../dtos/response/orcamentoResponseDTO';

function OrcamentoListPage() {
    const { orcamentosData, orcamentosLoading, orcamentosError } = useOrcamentos();

    if (orcamentosLoading) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Carregando...</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    if (orcamentosError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao consultar lista de orçamentos</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <h1>Orçamentos</h1>
                <AddButton href="/orcamentos/create">Adicionar Orçamento</AddButton>
                {orcamentosData?.length === 0 ? (
                    <p>Nenhum orçamento encontrado</p>
                ) : (
                    <GridContainer>
                        {orcamentosData?.map((orcamento: OrcamentoResponseDTO) => (
                            <Card key={orcamento.id.toString()} isActive = {true}>
                                <OrcamentoName>{orcamento.codigo}</OrcamentoName>
                                <OrcamentoInfo>
                                    <OrcamentoDetails><strong>Cliente:</strong> {orcamento.clienteNome}</OrcamentoDetails>
                                    <OrcamentoDetails><strong>Data do Orçamento:</strong> {new Date(orcamento.dataOrcamento).toLocaleDateString()}</OrcamentoDetails>
                                    <OrcamentoDetails><strong>Data de Expiração:</strong> {new Date(orcamento.dataExpiracao).toLocaleDateString()}</OrcamentoDetails>
                                    {orcamento.status === "Expirado" && <OrcamentoDetails><strong>Status: </strong><span style={{ color: "red" }}>{orcamento.status}</span></OrcamentoDetails>}
                                    {orcamento.status === "Finalizado" && <OrcamentoDetails><strong>Status: </strong><span style={{ color: "green" }}>{orcamento.status}</span></OrcamentoDetails>}
                                    {orcamento.status === "Aberto" && <OrcamentoDetails><strong>Status: </strong><span style={{ color: "blue" }}>{orcamento.status}</span></OrcamentoDetails>}
                                </OrcamentoInfo>
                                <OrcamentoActions>
                                    {orcamento.status === "Aberto" ? (
                                        <a href={`/orcamentos/${orcamento.id}`}>
                                            <FaPencilAlt /> Editar
                                        </a>
                                    ) : (
                                        <a href={`/orcamentos/${orcamento.id}`}>
                                            <FaSearch /> Visualizar
                                        </a>
                                    )}
                                </OrcamentoActions>
                            </Card>
                        ))}
                    </GridContainer>
                )}
            </Content>
            <Footer />
        </Container>
    );
}

const Header = () => (
    <HeaderContainer>
        <h1>Gestão de Orçamentos</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default OrcamentoListPage;
