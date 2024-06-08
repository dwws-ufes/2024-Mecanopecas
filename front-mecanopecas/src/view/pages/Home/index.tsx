import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {Container, Content, Section} from './styles.ts';


const Home = () => {
    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Section>
                        <h2>Sobre Nós</h2>
                        <p>
                            Bem-vindo à Mecanopeças, seu sistema de gerenciamento de peças. Nossa missão é facilitar a
                            gestão de peças automotivas, oferecendo um sistema robusto e fácil de usar.
                        </p>
                    </Section>
                    <Section>
                        <h2>Nossos Serviços</h2>
                        <p>
                            Oferecemos uma ampla gama de serviços para ajudar você a manter o controle sobre seu
                            inventário de peças. Desde o gerenciamento de estoque até a emissão de relatórios
                            detalhados.
                        </p>
                    </Section>
                    <Section>
                        <h2>Contato</h2>
                        <p>
                            Tem alguma dúvida? Entre em contato conosco pelo email contato@mecanopieces.com ou pelo
                            telefone (99) 99999-9999.
                        </p>
                    </Section>
                </Content>
            </Container>
            <Footer/>
        </>
);
}

export default Home;