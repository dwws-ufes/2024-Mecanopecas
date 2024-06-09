import React from 'react';
import { formatCPF, formatCNPJ } from '../../../helpers/formatters';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, Content, HeaderContainer, FooterContainer, GridContainer, Card, ClienteInfo, ClienteName, ClienteDetails, ClienteActions, AddButton } from './clienteListPage.styles';
import { useClientes, useDeleteCliente } from '../../../hooks/clienteHooks';
import { ClienteResponseDTO } from '../../../dtos/response/clienteResponseDTO';

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
            <Content>
                <h1>Clientes</h1>
                <AddButton href="/clientes/create">Adicionar Cliente</AddButton>
                {clientesData?.length === 0 ? (
                    <p>Nenhum cliente encontrado</p>
                ) : (
                    <GridContainer>
                        {clientesData?.map((cliente: ClienteResponseDTO) => (
                            <Card key={cliente.id.toString()} isActive={cliente.ativo}>
                                <ClienteInfo>
                                    <ClienteName>{cliente.nome}</ClienteName>

                                    <ClienteDetails><strong>{cliente.cpfCnpj.length === 11 ? 'CPF' : 'CNPJ'}:</strong> {cliente.cpfCnpj.length === 11 ? formatCPF(cliente.cpfCnpj) : formatCNPJ(cliente.cpfCnpj)}</ClienteDetails>
                                    <ClienteDetails><strong>{cliente.cpfCnpj.length === 11 ? 'Data de Nascimento' : 'Data de Fundação'}:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</ClienteDetails>
                                    <ClienteDetails><strong>Orçamentos:</strong> {cliente.orcamentos.length}</ClienteDetails>
                                </ClienteInfo>
                                <ClienteActions>
                                    <a href={`/clientes/${cliente.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    {cliente.ativo && (
                                        <button className="delete" onClick={() => handleDelete(cliente.id)}>
                                            <FaTrash /> Deletar
                                        </button>
                                    )}
                                </ClienteActions>
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
        <h1>Gestão de Clientes</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default ClienteListPage;
