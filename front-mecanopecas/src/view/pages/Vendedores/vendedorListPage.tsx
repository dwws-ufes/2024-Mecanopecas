import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Container, Content, GridContainer, Card, VendedorInfo, VendedorName, VendedorDetails, VendedorActions, AddButton } from './vendedorListPage.styles';
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
                <Content>
                    <h1>Carregando...</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    if (vendedoresError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao consultar lista de vendedores</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <h1>Vendedores</h1>
                <AddButton href="/vendedores/create">Adicionar Vendedor</AddButton>
                {vendedoresData?.length === 0 ? (
                    <p>Nenhum vendedor encontrado</p>
                ) : (
                    <GridContainer>
                        {vendedoresData?.map((vendedor: Vendedor) => (
                            <Card key={vendedor.id.toString()} isActive={vendedor.ativo}>
                                <VendedorInfo>
                                    <VendedorName>{vendedor.nome}</VendedorName>
                                    <VendedorDetails><strong>CPF:</strong> {vendedor.cpf}</VendedorDetails>
                                    <VendedorDetails><strong>Email:</strong> {vendedor.emailInstitucional}</VendedorDetails>
                                </VendedorInfo>
                                <VendedorActions>
                                    <a href={`/vendedores/${vendedor.id}`}>
                                        <FaPencilAlt /> Editar
                                    </a>
                                    {vendedor.ativo && (
                                        <button className="delete" onClick={() => handleDelete(vendedor.id)}>
                                            <FaTrash /> Deletar
                                        </button>
                                    )}
                                </VendedorActions>
                            </Card>
                        ))}
                    </GridContainer>
                )}
            </Content>
            <Footer />
        </Container>
    );
}

export default VendedoresListPage;
