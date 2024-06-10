import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { AxiosError } from 'axios';
import ToggleSwitch from '../../components/ToogleSwitch';
import { useNavigate, useParams } from 'react-router-dom';
import { Content, Container, FormContainer, PanelContainer, HeaderContainer, FooterContainer, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from './orcamentoCreateUpdatePage.styles';
import OrcamentoListPanel from "../../components/OrcamentoListPanel/orcamentoListPanel";
import { useCliente, useUpdateCliente } from '../../../hooks/clienteHooks';

function ClienteUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const [nome, setNome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [isPessoaJuridica, setIsPessoaJuridica] = useState(cpfCnpj.length > 11);
    const [dataNascimento, setDataNascimento] = useState<Date | null>(new Date());
    const [ativo, setAtivo] = useState(true);
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { clienteData, clienteLoading, clienteError } = useCliente(id ?? '0');
    const updateCliente = useUpdateCliente();

    useEffect(() => {
        if (clienteData) {
            setNome(clienteData.nome);
            setCpfCnpj(clienteData.cpfCnpj);
            setIsPessoaJuridica(clienteData.cpfCnpj.length > 11);
            setDataNascimento(new Date(clienteData.dataNascimento));
            setAtivo(clienteData.ativo);
        }
    }, [clienteData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await updateCliente.mutateAsync({
                id: BigInt(id ?? '0'),
                clienteRequestDTO: {
                    nome: nome,
                    cpfCnpj,
                    dataNascimento: dataNascimento ?? new Date(),
                    ativo: ativo
                }
            });

            navigate('/clientes');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao atualizar cliente';
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
        } else if (!isValidCpfCnpj(cpfCnpj)) {
            newErrors.cpfCnpj = 'CPF/CNPJ no formato incorreto';
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

    const isValidCpfCnpj = (cpfCnpj: string) => {
        const cpfCnpjRegex = /^\d{11}|\d{14}$/;
        return cpfCnpjRegex.test(cpfCnpj);
    };

    if (clienteLoading) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Carregando...</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    if (clienteError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao carregar dados do cliente</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <FormContainer>
                    <h1>Atualizar Cliente</h1>
                    <Form onSubmit={handleSubmit}>
                        {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
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
                            <FormLabel>{isPessoaJuridica ? 'CNPJ' : 'CPF'}</FormLabel>
                            <InputMask
                                mask={isPessoaJuridica ? '99.999.999/9999-99' : '999.999.999-99'}
                                value={cpfCnpj}
                                readOnly
                                readonlystyle
                            >
                                {(inputProps: any) => <FormInput {...inputProps} />}
                            </InputMask>
                            {errors.cpf && <ErrorMsg>{errors.cpf}</ErrorMsg>}
                        </FormField>
                        <FormField>
                            <FormLabel> {isPessoaJuridica ? 'Data de Fundação' : 'Data de Nascimento'}</FormLabel>
                            <FormInput
                                type="date"
                                value={dataNascimento ? dataNascimento.toISOString().split('T')[0] : ''}
                                onChange={(e) => setDataNascimento(new Date(e.target.value))}
                                required
                            />
                            {errors.dataNascimento && <ErrorMsg>{errors.dataNascimento}</ErrorMsg>}
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
                </FormContainer>
                <PanelContainer>
                    <OrcamentoListPanel orcamentos={clienteData?.orcamentos ?? []} />
                </PanelContainer>
            </Content>
            <Footer />
        </Container>
    );
}

const Header = () => (
    <HeaderContainer>
        <h1>Gestão de Clientes</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default ClienteUpdatePage;
