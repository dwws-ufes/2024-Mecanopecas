import React, {useState} from "react";
import {useCreateOrcamento} from "../../../hooks/orcamentoHooks.ts";

import {ModalBody, ModalOverlay} from "./styles.ts";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => {
                updateValue(event.target.value)
            }} />
        </>
    )
}

const OrcamentoCreateModal = () => {

    const { mutate } = useCreateOrcamento();
    const [ codigo, setCodigo ] = useState("");
    const [ dataExpiracao, setExpiracao ] = useState("");
    const [ clienteId, setClienteId] = useState()

    const submit = () => {
        const orcamentoData: { dataExpiracao: string; codigo: string; clienteId: number } = {
            codigo,
            dataExpiracao,
            clienteId
        }
        mutate(orcamentoData);
    }

    return (
        <ModalOverlay>
            <ModalBody>
                    <h2>Cadastre um nome Orçamento</h2>
                    <form className="input-container">
                        <Input label="codigo" value={codigo} updateValue={setCodigo} />
                        <Input label="dataExpiracao" value={dataExpiracao} updateValue={setExpiracao} />
                        <Input label="clientId" value={clienteId} updateValue={setClienteId} />
                    </form>
                    <button onClick={submit} className="btn btn-primary">Criar Orçamento</button>
            </ModalBody>
        </ModalOverlay>
    )

}

export default OrcamentoCreateModal;