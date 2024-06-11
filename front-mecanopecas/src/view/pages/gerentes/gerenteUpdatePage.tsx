import React, { useEffect, useState } from 'react';
import ToggleSwitch from '../../components/ToogleSwitch';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, ContentColumn, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from '../../styles/global';
import { useGerente, useUpdateGerente } from '../../../hooks/gerenteHooks';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function GerenteUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const parsedId = BigInt(id ?? '0');
    const [vendedorNome, setVendedorNome] = useState('');
    const [percentualMaxDesconto, setPercentualMaxDesconto] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { gerenteData, gerenteLoading, gerenteError } = useGerente(id ?? '0');
    const updateGerente = useUpdateGerente();

    useEffect(() => {
        if (gerenteData) {
            setVendedorNome(gerenteData.nome);
            setPercentualMaxDesconto(gerenteData.percentualMaxDesconto.toString());
        }
    }, [gerenteData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await updateGerente.mutateAsync({
                id: parsedId,
                gerenteRequestDTO: {
                    percentualMaxDesconto: parseFloat(percentualMaxDesconto),
                }
            });

            navigate('/gerentes');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao editar gerente';
            setSubmitError(errorMessage as string);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};

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

    if (gerenteLoading) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Carregando...</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    if (gerenteError) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Erro ao consultar gerente</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ContentColumn>
                <Form onSubmit={handleSubmit}>
                    {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                    <h1>Editar Gerente</h1>
                    <FormField>
                        <FormLabel>Vendedor</FormLabel>
                        <FormInput
                            type="text"
                            value={vendedorNome}
                            readOnly
                            readonlystyle
                        />
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
                    <FormField>
                        <FormLabel>Ativo</FormLabel>
                        <ToggleSwitch
                            checked={ativo}
                            onChange={() => setAtivo(!ativo)}
                        />
                    </FormField>
                    <FormButton type="submit">Salvar</FormButton>
                </Form>
            </ContentColumn>
            <Footer />
        </Container>
    );
}

export default GerenteUpdatePage;
