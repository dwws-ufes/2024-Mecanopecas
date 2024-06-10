import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f5f5;
    color: #333;
`;

export const Content = styled.main`
    flex: 1;
    padding: 20px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
`;

export const Card = styled.div<{ isactive: boolean }>`
    background: ${({ isactive }) => (isactive ? 'white' : '#e0e0e0')};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: ${({ isactive }) => (isactive ? 1 : 0.6)};
`;

export const CardInfo = styled.div`
    margin-bottom: 20px;
`;

export const CardName = styled.p`
    font-size: 1.25rem;
    font-weight: bold;
`;

export const CardDetails = styled.p`
    font-size: 0.875rem;
    margin: 5px 0;
`;

export const CardActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    a, button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
            background-color: #45a049;
        }

        &.delete {
            background-color: #f44336;

            &:hover {
                background-color: #d32f2f;
            }
        }

        svg {
            margin-right: 5px;
        }
    }
`;

export const AddButton = styled.a`
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    margin-bottom: 20px;

    &:hover {
        background-color: #45a049;
    }
`;
