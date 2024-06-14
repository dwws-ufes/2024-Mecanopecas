import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoleFromLocalStorage } from '../../../helpers/localStorage';
import {
    Container,
    Content,
    ContentColumn,
    FormContainer,
    PanelContainer,
    Form,
    FormField,
    FormLabel,
    FormInput,
    FormButton,
    ErrorMsg,
    Card,
    CardName,
    CardInfo,
    CardDetails,
    CardActions
} from '../../styles/global';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {
    useOrcamento,
    useCreateVendaForOrcamento,
    useAddPecaToOrcamento,
    useRemovePecaFromOrcamento,
    useApplyDescontoToOrcamento,
} from '../../../hooks/orcamentoHooks';

import { usePecasAtivas } from '../../../hooks/pecaHooks';

function OrcamentoUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { orcamentoData, orcamentoLoading, orcamentoError } = useOrcamento(id ?? '0');
    const { pecasAtivasData, pecasAtivasLoading, pecasAtivasError } = usePecasAtivas();

    const [clienteNome, setClienteNome] = useState('');
    const [orcamentoCodigo, setOrcamentoCodigo] = useState('');
    const [dataExpiracao, setDataExpiracao] = useState<Date | null>(null);
    const [selectedPecaId, setSelectedPecaId] = useState<string>('');
    const [quantidadePeca, setQuantidadePeca] = useState<number>(1);
    const [descontoPercentual, setDescontoPercentual] = useState<number>(0);
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitPecaError, setSubmitPecaError] = useState<string | null>(null);

    useEffect(() => {
        if (orcamentoData) {
            setClienteNome(orcamentoData.clienteNome);
            setOrcamentoCodigo(orcamentoData.codigo);
            setDataExpiracao(orcamentoData.dataExpiracao);
        }
    }, [orcamentoData]);

    useEffect(() => {
        if (pecasAtivasData && pecasAtivasData.length > 0) {
            setSelectedPecaId(pecasAtivasData[0].id.toString());
        }
    }, [pecasAtivasData]);

    const createVendaMutation = useCreateVendaForOrcamento();
    const addPecaMutation = useAddPecaToOrcamento();
    const removePecaMutation = useRemovePecaFromOrcamento();
    const applyDescontoMutation = useApplyDescontoToOrcamento();

    const handleAddPeca = async () => {

        if (!validateForm()) {
            return;
        }

        if (selectedPecaId) {
            try {
                await addPecaMutation.mutateAsync({
                    id: id ?? '0',
                    orcamentoPecaRequestDTO: {
                        pecaId: selectedPecaId,
                        quantidade: quantidadePeca,
                    },
                    valorPeca: pecasAtivasData?.find((peca) => peca.id.toString() === selectedPecaId)?.preco ?? 0,
                });
            } catch (error) {
                const axiosError = error as AxiosError;
                const errorMessage = axiosError.response?.data || 'Erro ao adicionar peça';
                setSubmitPecaError(errorMessage as string);
            }
        }
    };

    const handleRemovePeca = async (orcamentoPecaId: string) => {
        try {
            await removePecaMutation.mutateAsync({
                id: id ?? '0',
                orcamentoPecaId,
            });
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao remover peça';
            setSubmitPecaError(errorMessage as string);
        }
    };

    const handleApplyDesconto = async () => {
        try {
            await applyDescontoMutation.mutateAsync({
                id: id ?? '0',
                descontoPercentual,
            });
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao aplicar desconto';

            if (axiosError.response?.status === 403) {
                setSubmitError(errorMessage + ' Apenas gerentes podem aplicar desconto.');
            } else {
                setSubmitError(errorMessage as string);
            }
        }
    };

    const handleVenda = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createVendaMutation.mutateAsync({
                id: id ?? '0'
            });

            navigate('/orcamentos');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao gerar venda';
            setSubmitError(errorMessage as string);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};

        if (!selectedPecaId) {
            newErrors.selectedPecaId = 'Peça é obrigatória';
            valid = false;
        }

        if (!quantidadePeca) {
            newErrors.quantidadePeca = 'Quantidade é obrigatória';
            valid = false;
        } else if (quantidadePeca < 1) {
            newErrors.quantidadePeca = 'Quantidade deve ser maior que zero';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    if (orcamentoLoading || pecasAtivasLoading) {
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

    if (orcamentoError || pecasAtivasError) {
        return (
            <Container>
                <Header />
                <ContentColumn>
                    <h1>Erro ao carregar dados do orçamento</h1>
                </ContentColumn>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <PanelContainer>
                    <Card isactive={true}>
                        {submitPecaError && <ErrorMsg>{submitPecaError}</ErrorMsg>}
                        <FormField>
                            <FormLabel>Peça</FormLabel>
                            <select value={selectedPecaId} onChange={(e) => setSelectedPecaId(e.target.value)} required>
                                {pecasAtivasData?.map((peca) => (
                                    <option key={peca.id} value={peca.id.toString()}>
                                        {peca.nome} | Preço: {peca.preco} | Estoque: {peca.qtdEstoque}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedPecaId && <ErrorMsg>{errors.selectedPecaId}</ErrorMsg>}
                        </FormField>
                        <FormField>
                            <FormLabel>Quantidade</FormLabel>
                            <FormInput
                                type="number"
                                value={quantidadePeca}
                                onChange={(e) => setQuantidadePeca(parseInt(e.target.value))}
                            />
                            {errors.quantidadePeca && <ErrorMsg>{errors.quantidadePeca}</ErrorMsg>}
                        </FormField>
                        <hr />
                        <FormButton type="button" onClick={handleAddPeca}>Adicionar Peça</FormButton>
                    </Card>
                    <hr />
                    <h1>Peças do Orçamento</h1>
                    <div>
                        {orcamentoData?.pecas.map((peca) => (
                            <Card key={peca.id} isactive={true}>
                                <CardInfo>
                                    <CardName>{peca.nome}</CardName>
                                    <CardDetails><strong>Preço:</strong> {peca.preco}</CardDetails>
                                    <CardDetails><strong>Quantidade:</strong> {peca.quantidade}</CardDetails>
                                </CardInfo>
                                <CardActions>
                                    <button className="delete" onClick={() => handleRemovePeca(peca.id.toString())}> <FaTrash /> Deletar</button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </PanelContainer>
                <FormContainer>
                    <Form onSubmit={handleVenda}>
                        {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                        <h1>Detalhes do Orçamento</h1>
                        <FormField>
                            <FormLabel>Cliente</FormLabel>
                            <FormInput type="text" value={clienteNome} readOnly readonlystyle />
                        </FormField>
                        <FormField>
                            <FormLabel>Código do Orçamento</FormLabel>
                            <FormInput type="text" value={orcamentoCodigo} readOnly readonlystyle />
                        </FormField>
                        <FormField>
                            <FormLabel>Data de Expiração</FormLabel>
                            <FormInput type="datetime-local" value={dataExpiracao ? new Date(dataExpiracao).toISOString().slice(0, 16) : ''} readOnly readonlystyle />
                        </FormField>
                        <FormField>
                            <FormLabel>Valor Total</FormLabel>
                            <FormInput type="text" value={orcamentoData?.valorTotal} readOnly readonlystyle />
                        </FormField>

                        {getRoleFromLocalStorage() === 'GERENTE' && (
                            <>
                                <FormField>
                                    <FormLabel>Desconto Percentual</FormLabel>
                                    <FormInput
                                        type="number"
                                        value={descontoPercentual}
                                        onChange={(e) => setDescontoPercentual(parseInt(e.target.value))}
                                    />
                                </FormField>
                                <FormButton type="button" onClick={handleApplyDesconto} style={{ backgroundColor: 'blue' }}>Aplicar Desconto</FormButton>
                            </>
                        )}

                        <FormButton type="submit">Gerar Venda</FormButton>
                    </Form>
                </FormContainer>
            </Content>
            <Footer />
        </Container>
    );
}

export default OrcamentoUpdatePage;
