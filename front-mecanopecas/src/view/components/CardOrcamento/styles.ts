import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Card = styled.div`
    flex: 1;
    flex-direction: column;
    padding: 20px;
    margin: 10px 0;
    min-width: 200px;
    min-width: 150px;
    border-radius: 8px;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Button = styled.button`
    flex-direction: row;
    
    color: #fff;
    margin: 1em;
    font-size: 1.2em;
    border-radius: 8px;
    padding: 0.25em 1em;
    background: #64ae64;
    border: 2px solid #43794c;
`;

export const BlueButton = styled(Button)`
    background: #3d3dac;
    border: 2px solid #1212a5;
`
