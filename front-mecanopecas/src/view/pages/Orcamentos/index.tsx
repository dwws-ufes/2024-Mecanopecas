import React from 'react';

import { Container, Content, AddButton, GridContainer , Card, CardInfo, CardName, CardDetails, CardActions} from '../../../styles/global.ts'

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {FaPencilAlt, FaTrash} from "react-icons/fa";
import { useAllOrcamentos} from "../../../hooks/orcamentoHooks.ts";
import CardOrcamento from "../../components/CardOrcamento";


const Orcamentos = () => {
    const { orcamentosData, orcamentosError, orcamentosLoading } = useAllOrcamentos();

    // TODO: Transformar em Venda
    // const deleteVendedor = useDeleteVendedor();

    // TODO: Resolver a transformação em venda
    // const handleDelete = async (id: bigint) => {
    //     try {
    //         deleteVendedor.mutate(id);
    //     } catch (error) {
    //         console.error("Error deleting vendedor:", error);
    //     }
    // };

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
                    <h1>Erro ao consultar lista de vendedores</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <h1>Orçamentos</h1>
                    <AddButton href="/orcamento/create">Adicionar Orcamento</AddButton>
                    {
                        orcamentosData.length === 0 ?
                            (
                                <p>Nenhum orcamento encontrado</p>
                            ) : (
                                <GridContainer>
                                    {orcamentosData?.map((orcamento, index) => (
                                        <CardOrcamento
                                            key={index}
                                            id={orcamento}
                                            codigo={orcamento.codigo}
                                            nomeCliente={orcamento.nomeCliente}
                                            dataOrcamento={orcamento.dataOrcamento}
                                            dataExpiracao={orcamento.dataExpiracao}
                                            status={orcamento.status} />
                                    ))}
                                </GridContainer>
                            )}
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default Orcamentos;