import styled from 'styled-components';
import {Link} from "react-router-dom";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Card = styled.div`
    flex: 1;

    padding: 20px;
    margin: 10px 0;
    //min-width: 200px;
    //min-width: 150px;
    border-radius: 8px;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const CardDetails = styled.div`
    display: flex;
    flex: 0.5;
    flex-direction: column;
`

export const ButtonWrapper = styled.nav`
    flex: 0.5;
    flex-direction: column;
`

export const Redirect = styled(Link)`
    font-weight: bold;
`

export const Button = styled.button`    
    color: #fff;
    text-decoration: none;
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
`;