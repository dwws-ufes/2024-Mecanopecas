import React, { useEffect, useState } from 'react';
import ToggleSwitch from '../../components/ToogleSwitch';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Content, HeaderContainer, FooterContainer, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from './pecaCreateUpdatePage.styles';
import { usePeca, useUpdatePeca } from '../../../hooks/pecaHooks';

function PecaUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const parsedId = BigInt(id ?? '0');
    const [nome, setNome] = useState('');
    const [estoque, setEstoque] = useState('');
    const [preco, setPreco] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { pecaData, pecaLoading, pecaError } = usePeca(id ?? '0');
    const updatePeca = useUpdatePeca();

    useEffect(() => {
        if (pecaData) {
            setNome(pecaData.nome);
            setEstoque(pecaData.qtdEstoque.toString());
            setPreco(pecaData.preco.toString());
            setAtivo(pecaData.ativo);
        }
    }, [pecaData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await updatePeca.mutateAsync({
                id: parsedId,
                pecaRequestDTO: {
                    nome: nome,
                    qtdEstoque: parseInt(estoque),
                    preco: parseFloat(preco),
                    ativo: ativo
                }
            });
            
            navigate('/pecas');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao editar peça';
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

    if (pecaLoading) {
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

    if (pecaError) {
        return (
            <Container>
                <Header />
                <Content>
                    <h1>Erro ao consultar peça</h1>
                </Content>
                <Footer />
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <h1>Editar Peça</h1>
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
                        <FormLabel>Estoque</FormLabel>
                        <FormInput
                            type="number"
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
                    <FormField>
                        <FormLabel>Ativo</FormLabel>
                        <ToggleSwitch
                            checked={ativo}
                            onChange={() => setAtivo(!ativo)}
                        />
                    </FormField>
                    <FormButton type="submit">Salvar</FormButton>
                </Form>
            </Content>
            <Footer />
        </Container>
    );
}

const Header = () => (
    <HeaderContainer>
        <h1>Gestão de Peças</h1>
    </HeaderContainer>
);

const Footer = () => (
    <FooterContainer>
        <p>&copy; 2024 Minha Empresa</p>
    </FooterContainer>
);

export default PecaUpdatePage;
