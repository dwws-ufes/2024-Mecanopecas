import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { Container, ContentColumn, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from '../../styles/global';
import { useCreateGerente } from '../../../hooks/gerenteHooks';
import { useVendedoresAtivos } from '../../../hooks/vendedorHooks';
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function GerenteCreatePage() {
    const [vendedorId, setVendedorId] = useState('');
    const [percentualMaxDesconto, setPercentualMaxDesconto] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const createGerente = useCreateGerente();
    const { vendedoresAtivosData, vendedoresAtivosLoading, vendedoresAtivosError } = useVendedoresAtivos();

    useEffect(() => {
        if (vendedoresAtivosData && vendedoresAtivosData.length > 0) {
            setVendedorId(vendedoresAtivosData[0].id.toString());
        }
    }, [vendedoresAtivosData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createGerente.mutateAsync({
                vendedorId: BigInt(vendedorId),
                gerenteRequestDTO: {
                    percentualMaxDesconto: parseFloat(percentualMaxDesconto)
                }
            });

            navigate('/gerentes');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao adicionar gerente';
            setSubmitError(errorMessage as string);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};

        if (!vendedorId) {
            newErrors.vendedorId = 'Vendedor é obrigatório';
            valid = false;
        }

        if (!percentualMaxDesconto) {
            newErrors.percentualMaxDesconto = 'Percentual máximo de desconto é obrigatório';
            valid = false;
        } else if (isNaN(parseFloat(percentualMaxDesconto))) {
            newErrors.percentualMaxDesconto = 'Percentual máximo de desconto deve ser um número';
            valid = false;
        } else if (parseFloat(percentualMaxDesconto) < 0) {
            newErrors.percentualMaxDesconto = 'Percentual máximo de desconto deve ser um número positivo';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <Container>
            <Header />
            <ContentColumn>
                {vendedoresAtivosLoading ? (
                    <p>Carregando...</p>
                ) : vendedoresAtivosError ? (
                    <ErrorMsg>Erro ao carregar vendedores ativos</ErrorMsg>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                        <h1>Adicionar Gerente</h1>
                        <FormField>
                            <FormLabel>Vendedor</FormLabel>
                            <select value={vendedorId} onChange={(e) => setVendedorId(e.target.value)} required>
                                {vendedoresAtivosData?.map((vendedor) => (
                                    <option key={vendedor.id} value={vendedor.id.toString()}>
                                        {vendedor.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.vendedorId && <ErrorMsg>{errors.vendedorId}</ErrorMsg>}
                        </FormField>
                        <FormField>
                            <FormLabel>Percentual Máximo de Desconto</FormLabel>
                            <FormInput
                                type="number"
                                value={percentualMaxDesconto}
                                onChange={(e) => setPercentualMaxDesconto(e.target.value)}
                                required
                            />
                            {errors.percentualMaxDesconto && <ErrorMsg>{errors.percentualMaxDesconto}</ErrorMsg>}
                        </FormField>
                        <FormButton type="submit">Adicionar</FormButton>
                    </Form>
                )}
            </ContentColumn>
            <Footer />
        </Container>
    );
}

export default GerenteCreatePage;
