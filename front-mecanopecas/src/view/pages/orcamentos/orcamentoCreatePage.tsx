import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { AxiosError } from 'axios';
import { Container, Content, HeaderContainer, FooterContainer, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from './orcamentoCreateUpdatePage.styles';
import { useCreateOrcamento } from '../../../hooks/orcamentoHooks';
import { useClientesAtivos } from '../../../hooks/clienteHooks';
import { useNavigate } from 'react-router-dom';

function OrcamentoCreatePage() {
    const [clienteId, setClienteId] = useState('');
    const [codigo, setCodigo] = useState('');
    const [dataExpiracao, setDataExpiracao] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const createOrcamento = useCreateOrcamento();
    const { clientesAtivosData, clientesAtivosLoading, clientesAtivosError } = useClientesAtivos();

    useEffect(() => {
        if (clientesAtivosData && clientesAtivosData.length > 0) {
            setClienteId(clientesAtivosData[0].id.toString());
        }
    }, [clientesAtivosData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createOrcamento.mutateAsync({
                clienteId: BigInt(clienteId),
                codigo: codigo,
                dataExpiracao: new Date(dataExpiracao as string)
            });

            navigate('/orcamentos');
        } catch (error) {
            const axiosError = error as AxiosError;
            
            console.log(error);

            const errorMessage = axiosError.response?.data || 'Erro ao adicionar orçamento';
            setSubmitError(errorMessage as string);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};

        if (!clienteId) {
            newErrors.clienteId = 'Cliente é obrigatório';
            valid = false;
        }

        if (!codigo) {
            newErrors.codigo = 'Código é obrigatório';
            valid = false;
        } else if (!/^[A-Z]{3}[0-9]{4}$/.test(codigo)) {
            newErrors.codigo = 'Código deve seguir o padrão ORC####';
            valid = false;
        }

        if (!dataExpiracao) {
            newErrors.dataExpiracao = 'Data de Expiração é obrigatória';
            valid = false;
        } else if (new Date(dataExpiracao) < new Date()) {
            newErrors.dataExpiracao = 'Data de Expiração deve ser no futuro';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <Container>
            <Header />
            <Content>
                {clientesAtivosLoading ? (
                    <p>Carregando...</p>
                ) : clientesAtivosError ? (
                    <ErrorMsg>Erro ao carregar clientes ativos</ErrorMsg>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <h1>Adicionar Orçamento</h1>
                        {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                        <FormField>
                            <FormLabel>Cliente</FormLabel>
                            <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                                {clientesAtivosData?.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id.toString()}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.clienteId && <ErrorMsg>{errors.clienteId}</ErrorMsg>}
                        </FormField>
                        <FormField>
                            <FormLabel>Código</FormLabel>
                            <InputMask
                                mask="ORC9999"
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                            >
                                {(inputProps: any) => <FormInput {...inputProps} />}
                            </InputMask>
                            {errors.codigo && <ErrorMsg>{errors.codigo}</ErrorMsg>}
                        </FormField>
                        <FormField>
                            <FormLabel>Data de Expiração</FormLabel>
                            <FormInput
                                type="datetime-local"
                                value={dataExpiracao ? new Date(dataExpiracao).toISOString().slice(0, 16) : ''}
                                onChange={(e) => setDataExpiracao(e.target.value)}
                                required
                            />
                            {errors.dataExpiracao && <ErrorMsg>{errors.dataExpiracao}</ErrorMsg>}
                        </FormField>
                        <FormButton type="submit">Adicionar</FormButton>
                    </Form>
                )}
            </Content>
            <Footer />
        </Container>
    );
}

const Header = () => (
    <HeaderContainer>
        <h1>Gestão de Orçamentos</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default OrcamentoCreatePage;
