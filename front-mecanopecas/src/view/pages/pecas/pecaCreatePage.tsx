import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { Container, ContentColumn, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from '../../styles/global';
import { useCreatePeca } from '../../../hooks/pecaHooks';
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function PecaCreatePage() {
    const [nome, setNome] = useState('');
    const [estoque, setEstoque] = useState('');
    const [preco, setPreco] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const createPeca = useCreatePeca();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createPeca.mutateAsync({
                nome: nome,
                qtdEstoque: parseInt(estoque),
                preco: parseFloat(preco),
                ativo: true
            });

            navigate('/pecas');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao adicionar peca';
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

        if (!estoque) {
            newErrors.estoque = 'Estoque é obrigatório';
            valid = false;
        } else if (isNaN(parseInt(estoque))) {
            newErrors.estoque = 'Estoque deve ser um número';
            valid = false;
        } else if (parseInt(estoque) < 0) {
            newErrors.estoque = 'Estoque deve ser um número positivo';
            valid = false;
        }

        if (!preco) {
            newErrors.preco = 'Preço é obrigatório';
            valid = false;
        } else if (isNaN(parseFloat(preco))) {
            newErrors.preco = 'Preço deve ser um número';
            valid = false;
        } else if (parseFloat(preco) < 0) {
            newErrors.preco = 'Preço deve ser um número positivo';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <Container>
            <Header />
            <ContentColumn>
                <Form onSubmit={handleSubmit}>
                    {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                    <h1>Adicionar Peça</h1>
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
                        <FormLabel>Estoque</FormLabel>
                        <FormInput
                            type='number'
                            value={estoque}
                            onChange={(e) => setEstoque(e.target.value)}
                            required
                        />
                        {errors.estoque && <ErrorMsg>{errors.estoque}</ErrorMsg>}
                    </FormField>
                    <FormField>
                        <FormLabel>Preço</FormLabel>
                        <FormInput
                            type="number"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            required
                        />
                        {errors.preco && <ErrorMsg>{errors.preco}</ErrorMsg>}
                    </FormField>
                    <FormButton type="submit">Adicionar</FormButton>
                </Form>
            </ContentColumn>
            <Footer />
        </Container>
    );
}

export default PecaCreatePage;
