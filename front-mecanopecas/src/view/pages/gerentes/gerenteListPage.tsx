import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, Content, HeaderContainer, FooterContainer, GridContainer, Card, GerenteInfo, GerenteName, GerenteDetails, GerenteActions, AddButton } from './gerenteListPage.styles';
import { useGerentes, useDeleteGerente } from '../../../hooks/gerenteHooks';
import { GerenteResponseDTO } from '../../../dtos/response/gerenteResponseDTO';

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
                <Content>
                    <h1>Carregando...</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    if (gerentesError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao consultar lista de gerentes</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <h1>Gerentes</h1>
                <AddButton href="/gerentes/create">Adicionar Gerente</AddButton>
                {gerentesData?.length === 0 ? (
                    <p>Nenhum gerente encontrado</p>
                ) : (
                    <GridContainer>
                        {gerentesData?.map((gerente: GerenteResponseDTO) => (
                             <Card key={gerente.id.toString()} isActive={true}>
                                <GerenteInfo>
                                    <GerenteName>{gerente.nome}</GerenteName>
                                    <GerenteDetails><strong>Percentual de Desconto max.: </strong>{gerente.percentualMaxDesconto}%</GerenteDetails>
                                    <GerenteDetails><strong>Promovido em: </strong>{new Date(gerente.dataPromocao).toLocaleDateString()}</GerenteDetails>
                                </GerenteInfo>
                                <GerenteActions>
                                    <a href={`/gerentes/${gerente.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    <button className="delete" onClick={() => handleDelete(gerente.id)}>
                                        <FaTrash /> Deletar
                                    </button>
                                </GerenteActions>
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
        <h1>Gestão de Gerentes</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default GerenteListPage;
