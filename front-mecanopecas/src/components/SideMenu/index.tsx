import React from 'react';
import { FaTimes, FaHome, FaIdCardAlt } from 'react-icons/fa';

import { Container, Content} from './styles.ts';

import SideMenuItem from '../SideMenuItem';

const SideMenu = ({ active })  => {

    const closeSideMenu = () => { active(false); };

    return (
        <Container sidemenu={active}>
            <FaTimes onClick={closeSideMenu} />
            <Content>
                <SideMenuItem Icon={FaHome} Text="Home" Path="/"/>
                <SideMenuItem Icon={FaIdCardAlt} Text="Login" Path="login"/>
            </Content>
        </Container>
    );
}

export default SideMenu;
