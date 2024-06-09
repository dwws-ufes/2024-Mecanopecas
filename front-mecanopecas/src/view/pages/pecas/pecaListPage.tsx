import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, Content, HeaderContainer, FooterContainer, GridContainer, Card, PecaInfo, PecaName, PecaDetails, PecaActions, AddButton } from './pecaListPage.styles';
import { usePecas, useDeletePeca } from '../../../hooks/pecaHooks';
import { PecaResponseDTO } from '../../../dtos/response/pecaResponseDTO';

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
                <Content>
                    <h1>Carregando...</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    if (pecasError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao consultar lista de peças</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <h1>Peças</h1>
                <AddButton href="/pecas/create">Adicionar Peça</AddButton>
                {pecasData?.length === 0 ? (
                    <p>Nenhuma peça encontrada</p>
                ) : (
                    <GridContainer>
                        {pecasData?.map((peca: PecaResponseDTO) => (
                            <Card key={peca.id.toString()} isActive={peca.ativo}>
                                <PecaInfo>
                                    <PecaName>{peca.nome}</PecaName>
                                    <PecaDetails><strong>Estoque:</strong> {peca.qtdEstoque}</PecaDetails>
                                    <PecaDetails><strong>Preço:</strong> R${peca.preco.toFixed(2)}</PecaDetails>
                                </PecaInfo>
                                <PecaActions>
                                    <a href={`/pecas/${peca.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    {peca.ativo && (
                                        <button className="delete" onClick={() => handleDelete(peca.id)}>
                                            <FaTrash /> Deletar
                                        </button>
                                    )}
                                </PecaActions>
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
        <h1>Gestão de Peças</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default PecaListPage;
