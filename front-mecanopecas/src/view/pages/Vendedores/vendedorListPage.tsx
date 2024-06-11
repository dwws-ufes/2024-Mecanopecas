import { formatCPF } from '../../../helpers/formatters';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, ContentColumn, GridContainer, Card, CardInfo, CardName, CardDetails, CardActions, AddButton } from '../../styles/global';
import { useVendedores, useDeleteVendedor } from '../../../hooks/vendedorHooks';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface Vendedor {
    id: bigint;
    nome: string;
    cpf: string;
    emailInstitucional: string;
    ativo: boolean;
}

function VendedoresListPage() {
    const { vendedoresData, vendedoresLoading, vendedoresError } = useVendedores();
    const deleteVendedor = useDeleteVendedor();

    const handleDelete = async (id: bigint) => {
        try {
            deleteVendedor.mutate(id);
        } catch (error) {
            console.error("Error deleting vendedor:", error);
        }
    };

    if (vendedoresLoading) {
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

    if (vendedoresError) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Erro ao consultar lista de vendedores</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ContentColumn>
                <h1>Vendedores</h1>
                <AddButton href="/vendedores/create">Adicionar Vendedor</AddButton>
                {vendedoresData?.length === 0 ? (
                    <p>Nenhum vendedor encontrado</p>
                ) : (
                    <GridContainer>
                        {vendedoresData?.map((vendedor: Vendedor) => (
                            <Card key={vendedor.id.toString()} isactive={vendedor.ativo}>
                                <CardInfo>
                                    <CardName>{vendedor.nome}</CardName>
                                    <CardDetails><strong>CPF:</strong> {formatCPF(vendedor.cpf)}</CardDetails>
                                    <CardDetails><strong>Email:</strong> {vendedor.emailInstitucional}</CardDetails>
                                </CardInfo>
                                <CardActions>
                                    <a href={`/vendedores/${vendedor.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    {vendedor.ativo && (
                                        <button className="delete" onClick={() => handleDelete(vendedor.id)}>
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

export default VendedoresListPage;
