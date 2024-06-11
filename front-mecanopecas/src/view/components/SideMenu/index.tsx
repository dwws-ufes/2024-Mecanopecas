import { FaTimes, FaHome, FaUser, FaCogs, FaList, FaShoppingCart, FaUserTie } from 'react-icons/fa';

import { Container, Content} from './styles.ts';

import SideMenuItem from '../SideMenuItem';

const SideMenu = ({ active })  => {

    const closeSideMenu = () => { active(false); };

    const routes = [
        { Icon: FaUser, Text: "   Login", Path: "/" },
        { Icon: FaHome, Text: "   Home", Path: "/home" },
        { Icon: FaUser, Text: "   Clientes", Path: "/clientes"},
        { Icon: FaCogs, Text: "   Peças", Path: "/pecas"},
        { Icon: FaList, Text: "   Orçamentos", Path: "/orcamentos"},
        { Icon: FaShoppingCart, Text: "  Vendedores", Path: "/vendedores"},
        { Icon: FaUserTie, Text: "   Gerentes", Path: "/gerentes"}
    ];

    return (
        <Container sidemenu={active}>
            <FaTimes onClick={closeSideMenu} />
            <Content>
                {routes.map((route, index) => (
                    <SideMenuItem
                        key={index}
                        Icon={route.Icon}
                        Text={route.Text}
                        Path={route.Path}
                    />
                ))}
            </Content>
        </Container>
    );
}

export default SideMenu;
