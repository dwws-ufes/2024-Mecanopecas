import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Container, Logo } from './styles.ts';
import SideMenu from '../SideMenu';
import logo from '../../../assets/logo.png';

const Header = () => {
    const [isSideMenuOpen, setSideMenuOpen] = useState(false);
    const showSideMenu = () => setSideMenuOpen(!isSideMenuOpen);

    return (
        <Container>
            <FaBars onClick={showSideMenu} className="menu-icon" />
            <Logo src={logo} alt="App Logo" />
            {isSideMenuOpen && <SideMenu active={setSideMenuOpen} />}
        </Container>
    );
};

export default Header;
