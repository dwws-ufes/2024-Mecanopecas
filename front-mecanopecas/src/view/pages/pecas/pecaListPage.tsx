import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, ContentColumn, GridContainer, Card, CardInfo, CardName, CardDetails, CardActions, AddButton } from '../../styles/global';;
import { usePecas, useDeletePeca } from '../../../hooks/pecaHooks';
import { PecaResponseDTO } from '../../../dtos/response/pecaResponseDTO';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function PecaListPage() {
    const { pecasData, pecasLoading, pecasError } = usePecas();
    const deletePeca = useDeletePeca();

    const handleDelete = async (id: bigint) => {
        try {
            deletePeca.mutate(id);
        } catch (error) {
            console.error("Error deleting peça:", error);
        }
    };

    if (pecasLoading) {
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

    if (pecasError) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Erro ao consultar lista de peças</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ContentColumn>
                <h1>Peças</h1>
                <AddButton href="/pecas/create">Adicionar Peça</AddButton>
                {pecasData?.length === 0 ? (
                    <p>Nenhuma peça encontrada</p>
                ) : (
                    <GridContainer>
                        {pecasData?.map((peca: PecaResponseDTO) => (
                            <Card key={peca.id.toString()} isactive={peca.ativo}>
                                <CardInfo>
                                    <CardName>{peca.nome}</CardName>
                                    <CardDetails><strong>Estoque:</strong> {peca.qtdEstoque}</CardDetails>
                                    <CardDetails><strong>Preço:</strong> R${peca.preco.toFixed(2)}</CardDetails>
                                </CardInfo>
                                <CardActions>
                                    <a href={`/pecas/${peca.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    {peca.ativo && (
                                        <button className="delete" onClick={() => handleDelete(peca.id)}>
                                            <FaTrash /> Deletar
                                        </button>
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

export default PecaListPage;
