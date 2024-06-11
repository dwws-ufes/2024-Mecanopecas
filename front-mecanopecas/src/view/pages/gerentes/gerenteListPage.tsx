import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, ContentColumn, GridContainer, Card, CardInfo, CardName, CardDetails, CardActions, AddButton } from '../../styles/global';
import { useGerentes, useDeleteGerente } from '../../../hooks/gerenteHooks';
import { GerenteResponseDTO } from '../../../dtos/response/gerenteResponseDTO';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function GerenteListPage() {
    const { gerentesData, gerentesLoading, gerentesError } = useGerentes();
    const deleteGerente = useDeleteGerente();

    const handleDelete = async (id: bigint) => {
        try {
            deleteGerente.mutate(id);
        } catch (error) {
            console.error("Error deleting gerente:", error);
        }
    };

    if (gerentesLoading) {
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

    if (gerentesError) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Erro ao consultar lista de gerentes</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ContentColumn>
                <h1>Gerentes</h1>
                <AddButton href="/gerentes/create">Adicionar Gerente</AddButton>
                {gerentesData?.length === 0 ? (
                    <p>Nenhum gerente encontrado</p>
                ) : (
                    <GridContainer>
                        {gerentesData?.map((gerente: GerenteResponseDTO) => (
                             <Card key={gerente.id.toString()} isactive={true}>
                                <CardInfo>
                                    <CardName>{gerente.nome}</CardName>
                                    <CardDetails><strong>Percentual de Desconto max.: </strong>{gerente.percentualMaxDesconto}%</CardDetails>
                                    <CardDetails><strong>Promovido em: </strong>{new Date(gerente.dataPromocao).toLocaleDateString()}</CardDetails>
                                </CardInfo>
                                <CardActions>
                                    <a href={`/gerentes/${gerente.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    <button className="delete" onClick={() => handleDelete(gerente.id)}>
                                        <FaTrash /> Deletar
                                    </button>
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

export default GerenteListPage;
