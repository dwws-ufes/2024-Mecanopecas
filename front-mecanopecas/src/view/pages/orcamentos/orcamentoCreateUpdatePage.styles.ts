import styled, {css} from 'styled-components';

interface FormInputProps {
    readonlystyle?: boolean;
}


export const Content = styled.main`
    flex: 1;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 60px;
`;

export const FormContainer = styled.div`
    flex: 1;
`;

export const PanelContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 180px);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f5f5;
    color: #333;
`;

export const HeaderContainer = styled.header`
    background-color: #4CAF50;
    padding: 20px;
    text-align: center;
    color: white;
`;

export const FooterContainer = styled.footer`
    background-color: #4CAF50;
    padding: 10px;
    text-align: center;
    color: white;
    position: relative;
    bottom: 0;
    width: 100%;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormField = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormLabel = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    align-self: flex-start;
`;

export const FormInput  = styled.input<FormInputProps>`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;

    ${({ readonlystyle }) =>
        readonlystyle &&
        css`
            background-color: #f2f2f2;
            color: #999;
            cursor: not-allowed;
        `}
`;

export const FormButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;

    &:hover {
        background-color: #45a049;
    }
`;

export const ErrorMsg = styled.span`
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
    display: block;
`;
