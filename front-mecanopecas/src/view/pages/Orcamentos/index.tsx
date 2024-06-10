import React, {useEffect} from 'react';

import { Container, Content, AddButton, GridContainer , Card, CardInfo, CardName, CardDetails, CardActions} from '../../../styles/global.ts'

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useAllOrcamentos} from "../../../hooks/orcamentoHooks.ts";
import CardOrcamento from "../../components/CardOrcamento";
import OrcamentoCreateModal from "./orcamentoCreateModal.tsx";


const Orcamentos = () => {
    const { orcamentosData, orcamentosError, orcamentosLoading } = useAllOrcamentos();
    const [ isModalOpen, setModalOpen ] = React.useState(false);

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

    const handleOpenModal = () => {
        setModalOpen((prevState) => !prevState);
    }

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <h1>Orçamentos</h1>
                    {/*<AddButton href="/orcamento/create">Adicionar Orcamento</AddButton>*/}
                    <button onClick={handleOpenModal}>Adicionar Orçamento</button>
                    {
                        orcamentosData.length === 0 ?
                            (
                                <p>Nenhum orcamento encontrado</p>
                            ) : (
                                <GridContainer>
                                    {orcamentosData?.map((orcamento, index) => (
                                        <CardOrcamento
                                            key={index}
                                            id={orcamento.id}
                                            codigo={orcamento.codigo}
                                            nomeCliente={orcamento.clienteNome}
                                            dataOrcamento={orcamento.dataOrcamento}
                                            dataExpiracao={orcamento.dataExpiracao}
                                            status={orcamento.status} />
                                    ))}
                                </GridContainer>
                            )}
                </Content>
                { isModalOpen && <OrcamentoCreateModal/>}
            </Container>
            <Footer />
        </>
    )
}

export default Orcamentos;