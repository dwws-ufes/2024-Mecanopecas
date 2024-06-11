import { formatCPF, formatCNPJ } from '../../../helpers/formatters';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, Content, ContentColumn, GridContainer, Card, CardInfo, CardName, CardDetails, CardActions, AddButton } from '../../styles/global';
import { useClientes, useDeleteCliente } from '../../../hooks/clienteHooks';
import { ClienteResponseDTO } from '../../../dtos/response/clienteResponseDTO';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ClienteListPage() {
    const { clientesData, clientesLoading, clientesError } = useClientes();
    const deleteCliente = useDeleteCliente();

    const handleDelete = async (id: bigint) => {
        try {
            deleteCliente.mutate(id);
        } catch (error) {
            console.error("Error deleting cliente:", error);
        }
    };

    if (clientesLoading) {
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

    if (clientesError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao consultar lista de clientes</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ContentColumn>
                <h1>Clientes</h1>
                <AddButton href="/clientes/create">Adicionar Cliente</AddButton>
                {clientesData?.length === 0 ? (
                    <p>Nenhum cliente encontrado</p>
                ) : (
                    <GridContainer>
                        {clientesData?.map((cliente: ClienteResponseDTO) => (
                            <Card key={cliente.id.toString()} isactive={cliente.ativo}>
                                <CardInfo>
                                    <CardName>{cliente.nome}</CardName>

                                    <CardDetails><strong>{cliente.cpfCnpj.length === 11 ? 'CPF' : 'CNPJ'}:</strong> {cliente.cpfCnpj.length === 11 ? formatCPF(cliente.cpfCnpj) : formatCNPJ(cliente.cpfCnpj)}</CardDetails>
                                    <CardDetails><strong>{cliente.cpfCnpj.length === 11 ? 'Data de Nascimento' : 'Data de Fundação'}:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</CardDetails>
                                    <CardDetails><strong>Orçamentos:</strong> {cliente.orcamentos.length}</CardDetails>
                                </CardInfo>
                                <CardActions>
                                    <a href={`/clientes/${cliente.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    {cliente.ativo && (
                                        <button className="delete" onClick={() => handleDelete(cliente.id)}>
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

export default ClienteListPage;
