import React from 'react';
import {Container, Card, Button, BlueButton} from './styles.ts';

interface orcamentoProps {
    id: bigint,
    title: string,
    status: string
}

const CardOrcamento = ({ id, title, status }: orcamentoProps) => {
    return (
        <Container>
            <Card>
                <h3>{id}</h3>
                <h4>{title}</h4>
                <p>{status}</p>
                <BlueButton>Consultar</BlueButton>
                <Button>Transformar em Venda</Button>

            </Card>
        </Container>
    )
}

export default CardOrcamento;