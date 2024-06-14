import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF; 
  box-shadow: 0 0 20px 3px;

  .menu-icon {
    position: fixed;
    left: 32px;
    color: black;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

export const Logo = styled.img`
  height: 60px;
  object-fit: contain;
`;