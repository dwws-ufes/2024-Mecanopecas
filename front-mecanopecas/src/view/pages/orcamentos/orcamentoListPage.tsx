import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { Container, ContentColumn, GridContainer, Card, CardName, CardInfo, CardDetails, CardActions, AddButton } from '../../styles/global';;
import { useOrcamentos } from '../../../hooks/orcamentoHooks';
import { OrcamentoResponseDTO } from '../../../dtos/response/orcamentoResponseDTO';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function OrcamentoListPage() {
    const { orcamentosData, orcamentosLoading, orcamentosError } = useOrcamentos();

    if (orcamentosLoading) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Carregando...</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    if (orcamentosError) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Erro ao consultar lista de orçamentos</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ContentColumn>
                <h1>Orçamentos</h1>
                <AddButton href="/orcamentos/create">Adicionar Orçamento</AddButton>
                {orcamentosData?.length === 0 ? (
                    <p>Nenhum orçamento encontrado</p>
                ) : (
                    <GridContainer>
                        {orcamentosData?.map((orcamento: OrcamentoResponseDTO) => (
                            <Card key={orcamento.id.toString()} isactive = {true}>
                                <CardName>{orcamento.codigo}</CardName>
                                <CardInfo>
                                    <CardDetails><strong>Cliente:</strong> {orcamento.clienteNome}</CardDetails>
                                    <CardDetails><strong>Data do Orçamento:</strong> {new Date(orcamento.dataOrcamento).toLocaleDateString()}</CardDetails>
                                    <CardDetails><strong>Data de Expiração:</strong> {new Date(orcamento.dataExpiracao).toLocaleDateString()}</CardDetails>
                                    {orcamento.status === "Expirado" && <CardDetails><strong>Status: </strong><span style={{ color: "red" }}>{orcamento.status}</span></CardDetails>}
                                    {orcamento.status === "Finalizado" && <CardDetails><strong>Status: </strong><span style={{ color: "green" }}>{orcamento.status}</span></CardDetails>}
                                    {orcamento.status === "Aberto" && <CardDetails><strong>Status: </strong><span style={{ color: "blue" }}>{orcamento.status}</span></CardDetails>}
                                </CardInfo>
                                <CardActions>
                                    {orcamento.status === "Aberto" ? (
                                        <a href={`/orcamentos/${orcamento.id}`}>
                                            <FaPencilAlt /> Editar
                                        </a>
                                    ) : (
                                        <a href={`/orcamentos/${orcamento.id}`}>
                                            <FaSearch /> Visualizar
                                        </a>
                                    )}
                                </CardActions>
                            </Card>
                        ))}
                    </GridContainer>
                )}
            </ContentColumn>
            <Footer />
        </Container>
    );
}
export default OrcamentoListPage;
