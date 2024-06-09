import React from 'react';

import { Container } from './styles.ts'

import Header from "../../components/Header";
import Footer from "../../components/Footer";

// import useOrcamentoDetail from "../../../hooks/useOrcamento.ts";

interface detailsProps {
    id: number,
    codigo: string,
    vendedorNome: string,
    clienteNome: string,
    dataOrcamento: Date,
    dataExpiracao: Date,
    valor: number,
    percentualDesconto: number,
    valorTotal: number,
    pecas: any[],
    status: string
}

const DetailsOrcamentos = ({
       id,
       codigo,
       vendedorNome,
       clienteNome,
       dataOrcamento,
       dataExpiracao,
       valor,
       percentualDesconto,
       valorTotal,
       pecas,
       status
}) => {

    // const { orcamentoData, ocamentoLoadin, orcamentoError } = useOrcamentoDetail();

    return (
        <>
            <Header/>
            <div className="detalhes-contrato">
                <h1>Detalhes do Contrato</h1>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Código:</strong> {codigo}</p>
                <p><strong>Nome do Vendedor:</strong> {vendedorNome}</p>
                <p><strong>Nome do Cliente:</strong> {clienteNome}</p>
                <p><strong>Data do Orçamento:</strong> {dataOrcamento?.toLocaleDateString()}</p>
                <p><strong>Data de Expiração:</strong> {dataExpiracao?.toLocaleDateString()}</p>
                <p><strong>Valor:</strong> R$ {valor?.toFixed(2)}</p>
                <p><strong>Percentual de Desconto:</strong> {percentualDesconto}%</p>
                <p><strong>Valor Total:</strong> R$ {valorTotal?.toFixed(2)}</p>
                <p><strong>Status:</strong> {status}</p>
                <div>
                    <h2>Partes</h2>
                    <ul>
                        {pecas?.map((parte, index) => (
                            <li key={index}>{JSON.stringify(parte)}</li> // Ajuste a renderização conforme necessário
                        ))}
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DetailsOrcamentos;