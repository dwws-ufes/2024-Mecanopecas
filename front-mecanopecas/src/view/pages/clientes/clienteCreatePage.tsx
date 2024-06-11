import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { AxiosError } from 'axios';
import { Container, ContentColumn, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from '../../styles/global';
import { useCreateCliente } from '../../../hooks/clienteHooks';
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ClienteCreatePage() {
    const [nome, setNome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [isPessoaJuridica, setIsPessoaJuridica] = useState(false);
    const [dataNascimento, setDataNascimento] = useState<Date | null>(new Date());
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const createCliente = useCreateCliente();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createCliente.mutateAsync({
                nome: nome,
                cpfCnpj: cpfCnpj.replace(/[^0-9]/g, ''),
                dataNascimento: dataNascimento ?? new Date(),
                ativo: true
            });

            navigate('/clientes');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao adicionar cliente';
            setSubmitError(errorMessage as string);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};

        if (!nome) {
            newErrors.nome = 'Nome é obrigatório';
            valid = false;
        }

        if (!cpfCnpj) {
            newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório';
            valid = false;
        } else if (isPessoaJuridica && !isValidCNPJ(cpfCnpj)) {
            newErrors.cpfCnpj = 'CNPJ no formato incorreto';
            valid = false;
        } else if (!isPessoaJuridica && !isValidCPF(cpfCnpj)) {
            newErrors.cpfCnpj = 'CPF no formato incorreto';
            valid = false;
        }

        if (!dataNascimento) {
            newErrors.dataNascimento = 'Data de Nascimento/Fundação é obrigatória';
            valid = false;
        } else if (new Date(dataNascimento) > new Date()) {
            newErrors.dataNascimento = 'Data de Nascimento/Fundação não pode ser no futuro';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const isValidCPF = (cpf: string) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return cpfRegex.test(cpf);
    };

    const isValidCNPJ = (cnpj: string) => {
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        return cnpjRegex.test(cnpj);
    };

    return (
        <Container>
            <Header />
            <ContentColumn>
                <Form onSubmit={handleSubmit}>
                    {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                    <h1>Adicionar Cliente</h1>
                    <FormField>
                        <FormLabel>Nome</FormLabel>
                        <FormInput
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        {errors.nome && <ErrorMsg>{errors.nome}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>Tipo de Cliente</FormLabel>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    checked={!isPessoaJuridica}
                                    onChange={() => setIsPessoaJuridica(false)}
                                />
                                Pessoa Física
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    checked={isPessoaJuridica}
                                    onChange={() => setIsPessoaJuridica(true)}
                                />
                                Pessoa Jurídica
                            </label>
                        </div>
                    </FormField>
                    <FormField>
                        <FormLabel>{isPessoaJuridica ? 'CNPJ' : 'CPF'}</FormLabel>
                        <InputMask
                            mask={isPessoaJuridica ? '99.999.999/9999-99' : '999.999.999-99'}
                            value={cpfCnpj}
                            onChange={(e) => setCpfCnpj(e.target.value)}
                            required
                        >
                            {(inputProps: any) => <FormInput {...inputProps} />}
                        </InputMask>
                        {errors.cpfCnpj && <ErrorMsg>{errors.cpfCnpj}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>{isPessoaJuridica ? 'Data de Fundação' : 'Data de Nascimento'}</FormLabel>
                        <FormInput
                            type="date"
                            value={dataNascimento ? dataNascimento.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDataNascimento(new Date(e.target.value))}
                            required
                        />
                        {errors.dataNascimento && <ErrorMsg>{errors.dataNascimento}</ErrorMsg>}
                    </FormField>
                    <FormButton type="submit">Adicionar</FormButton>
                </Form>
            </ContentColumn>
            <Footer />
        </Container>
    );
}

export default ClienteCreatePage;
