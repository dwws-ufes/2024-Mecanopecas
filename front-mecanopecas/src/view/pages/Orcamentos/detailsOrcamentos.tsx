import React from 'react';

import {Container, Content} from './styles.ts'

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {useOrcamento} from "../../../hooks/useOrcamento.ts";
import orcamentosRepository from '../../../repositories/orcamentosRepository.ts';


const DetailsOrcamentos = () => {

    const { data } = useOrcamento()
    // const { data } = orcamentosRepository.getAllOrcamentos();
    console.log(data);

    return (
        <>
            <Header />
            <Container>
                <h1>Orçamentos</h1>
                <Content>
                    <h1>oioi</h1>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default DetailsOrcamentos;