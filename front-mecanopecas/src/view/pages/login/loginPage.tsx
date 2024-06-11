import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { Container, ContentColumn, Form, FormField, FormLabel, FormInput, FormButton, ErrorMsg } from '../../styles/global';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/authenticationHooks.ts';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function LoginPage() {
    const [emailInstitucional, setEmailInstitucional] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
    const login = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await login.mutateAsync({
                email: emailInstitucional,
                password: password
            });
            navigate('/home');
        } catch (error) {
            console.error(error);
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || 'Erro ao fazer login';
            setSubmitError(errorMessage as string);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};

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

        setErrors(newErrors);
        return valid;
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <Container>
            <Header />
            <ContentColumn>
                <Form onSubmit={handleSubmit}>
                    {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
                <h1>Login</h1>
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
                    <FormButton type="submit">Login</FormButton>
                </Form>
            </ContentColumn>
            <Footer />
        </Container>
    );
}

export default LoginPage;