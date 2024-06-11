import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, ContentColumn, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from '../../styles/global';
import { useCreateVendedor } from '../../../hooks/vendedorHooks';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function VendedorCreatePage() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [emailInstitucional, setEmailInstitucional] = useState('');
    const [password, setPassword] = useState('');
    const [dataNascimento, setDataNascimento] = useState<Date | null>(new Date());
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const createVendedor = useCreateVendedor();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createVendedor.mutateAsync({
                nome: nome,
                cpf: cpf.replace(/[^0-9]/g, ''),
                telefone: telefone.replace(/[^0-9]/g, ''),
                emailInstitucional,
                password,
                dataNascimento: dataNascimento ?? new Date(),
                ativo: true
            });
            navigate('/vendedores');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao adicionar vendedor';
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

        if (!cpf) {
            newErrors.cpf = 'CPF é obrigatório';
            valid = false;
        } else if (!isValidCPF(cpf)) {
            newErrors.cpf = 'CPF no formato incorreto';
            valid = false;
        }

        if (!telefone) {
            newErrors.telefone = 'Telefone é obrigatório';
            valid = false;
        } else if (!isValidTelefone(telefone)) {
            newErrors.telefone = 'Telefone no formato incorreto';
            valid = false;
        }

        if (!emailInstitucional) {
            newErrors.emailInstitucional = 'Email Institucional é obrigatório';
            valid = false;
        } else if (!isValidEmail(emailInstitucional)) {
            newErrors.emailInstitucional = 'Email Institucional inválido';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Senha é obrigatória';
            valid = false;
        }

        if (!dataNascimento) {
            newErrors.dataNascimento = 'Data de Nascimento é obrigatória';
            valid = false;
        } else if (dataNascimento > new Date()) {
            newErrors.dataNascimento = 'Data de Nascimento não pode ser no futuro';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidCPF = (cpf: string) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return cpfRegex.test(cpf);
    };

    const isValidTelefone = (telefone: string) => {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return telefoneRegex.test(telefone);
    };

    return (
        <Container>
            <Header />
            <ContentColumn>
                <Form onSubmit={handleSubmit}>
                {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                <h1>Adicionar Vendedor</h1>
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
                        <FormLabel>CPF</FormLabel>
                        <InputMask
                            mask="999.999.999-99"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        >
                            {(inputProps: any) => <FormInput {...inputProps} />}
                        </InputMask>
                        {errors.cpf && <ErrorMsg>{errors.cpf}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>Telefone</FormLabel>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        >
                            {(inputProps: any) => <FormInput {...inputProps} />}
                        </InputMask>
                        {errors.telefone && <ErrorMsg>{errors.telefone}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>Email Institucional</FormLabel>
                        <FormInput
                            type="email"
                            value={emailInstitucional}
                            onChange={(e) => setEmailInstitucional(e.target.value)}
                            required
                        />
                        {errors.emailInstitucional && <ErrorMsg>{errors.emailInstitucional}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>Senha</FormLabel>
                        <FormInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>Data de Nascimento</FormLabel>
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

export default VendedorCreatePage;
