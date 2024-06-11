import React from 'react';
import {Card, CardInfo, CardName, CardDetails, CardActions} from '../../styles/global.ts'
import {FaPencilAlt, FaTrash} from "react-icons/fa";

interface orcamentoProps {
    id: bigint,
    codigo: string,
    nomeCliente: string,
    dataOrcamento: string,
    dataExpiracao: string,
    status: string,
}

const CardOrcamento = ({ id, codigo, nomeCliente, dataOrcamento, dataExpiracao, status }: orcamentoProps) => {
    return (
        <Card key={id.toString()} isactive={status === "Finalizado" ? false : true}>
            <CardInfo>
                <CardName>{codigo}</CardName>
                <CardDetails><strong>Nome Cliente: </strong>{nomeCliente}</CardDetails>
                <CardDetails><strong>Data Orcamento: </strong>{dataOrcamento}</CardDetails>
                <CardDetails><strong>Data Expiração: </strong>{dataExpiracao}</CardDetails>
                <CardDetails><strong>Status: </strong>{status}</CardDetails>
            </CardInfo>
            <CardActions>
                <a href={`/orcamentos/${id}`}>
                    <FaPencilAlt /> visualizar
                </a>
                {/*{orcamento.ativo && (*/}
                {/*    <button className="delete"> onClick={() => console.log(orcamento.id)}>*/}
                {/*        <FaTrash /> Transformar em Venda*/}
                {/*    </button>*/}
                {/*)}*/}
            </CardActions>
        </Card>
    )
}

export default CardOrcamento;