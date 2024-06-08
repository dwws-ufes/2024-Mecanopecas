import React, { useState} from 'react';
import { FaBars } from 'react-icons/fa';
import { Container } from './styles.ts';

import SideMenu from '../SideMenu';

const Header = () => {
    const [isSideMenuOpen, setSideMenuOpen] = useState(true);
    const showSideMenu = () => setSideMenuOpen(!isSideMenuOpen);

    return  (
        <Container>
            <FaBars onClick={showSideMenu} />
            {isSideMenuOpen && <SideMenu active={setSideMenuOpen} />}
        </Container>
    );
};

export default Header;
