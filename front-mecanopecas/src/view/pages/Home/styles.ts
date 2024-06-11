import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 3fr);
    grid-template-rows: repeat(1, 1fr);
    align-items: center;
    background: #f0f0f0;
`;

export const Content = styled.div`
    margin-left: 300px; /* Considerando a largura do side menu + espaçamento */
    padding: 20px;
`;

export const Section = styled.section`
    background: #ffffff;
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


