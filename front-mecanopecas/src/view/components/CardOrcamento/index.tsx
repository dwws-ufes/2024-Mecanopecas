import React from 'react';
import {Container, Card, Button, BlueButton, ButtonWrapper, CardDetails, Redirect} from './styles.ts';

interface orcamentoProps {
    id: bigint,
    title: string,
    status: string
}

const CardOrcamento = ({ id, title, status }: orcamentoProps) => {


    return (
        <Container>
            <Card>
                <CardDetails>
                    <h3>{id}</h3>
                    <h4>{title}</h4>
                    <p>{status}</p>
                </CardDetails>
                <ButtonWrapper>
                    <Redirect to={`/orcamentos/${id}`} >
                        <BlueButton>Consultar Detalhes</BlueButton>
                    </Redirect>
                    <Redirect to={`/orcamentos/${id}/venda`}>
                        <Button>Transformar em Venda</Button>
                    </Redirect>
                </ButtonWrapper>
            </Card>
        </Container>
    )
}

export default CardOrcamento;