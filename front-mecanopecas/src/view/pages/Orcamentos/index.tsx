import React from 'react';

import {Container, Content, Section} from './styles.ts'

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {useOrcamento} from "../../../repositories/useOrcamento.ts";

import CardOrcamento from "../../components/CardOrcamento";


const Orcamentos = () => {

    const { data } = useOrcamento()

    console.log(data);

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Section>
                        <h1>Orçamentos</h1>
                    </Section>
                    {data?.map((orcamento, index) =>
                        <CardOrcamento
                            key={index}
                            id={orcamento.id}
                            title={orcamento.codigo}
                            status={orcamento.status}
                        />
                    )}
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default Orcamentos;