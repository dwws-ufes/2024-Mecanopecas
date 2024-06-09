import React, {useState} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Container } from './styles.ts';

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

const InserirOrcamento = () => {

    const [ codigo, setCodigo ] = useState("ORC135");
    const [ dataExpiracao, setExpiracao ] = useState("2024-06-30T00:00:00");
    const [ clientId, setClientId] = useState(1)

    return (
        <>
            <Header />
                <div className="modal-overlay">
                    <div className="modal-body">
                        <form className="input-container">
                            <Input label="codigo" value={codigo} updateValue={} />
                            <Input label="dataExpiracao" value={dataExpiracao} updateValue={} />
                            <Input label="clientId" value={clientId} updateValue={} />
                        </form>
                    </div>
                </div>
            <Footer />
        </>
    )

}

export default InserirOrcamento;