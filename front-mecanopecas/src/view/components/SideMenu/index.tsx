import { FaTimes, FaHome, FaUser, FaCogs, FaList, FaShoppingCart, FaUserTie, FaPowerOff } from 'react-icons/fa';
import { getRoleFromLocalStorage } from '../../../helpers/localStorage.ts';

import { Container, Content} from './styles.ts';

import SideMenuItem from '../SideMenuItem';

const SideMenu = ({ active })  => {

    const closeSideMenu = () => { active(false); };

    const routes = [
        { Icon: FaHome, Text: "   Home", Path: "/home" },
        { Icon: FaUser, Text: "   Clientes", Path: "/clientes"},
        { Icon: FaCogs, Text: "   Peças", Path: "/pecas"},
        { Icon: FaList, Text: "   Orçamentos", Path: "/orcamentos"},
        { Icon: FaShoppingCart, Text: "  Vendedores", Path: "/vendedores"},
        { Icon: FaUserTie, Text: "   Gerentes", Path: "/gerentes"},
        { Icon: FaPowerOff, Text: "   Logout", Path: "/" },
    ];

    return (
        <Container sidemenu={active}>
            <FaTimes onClick={closeSideMenu} />
            <Content>
                {routes.map((route, index) => {
                    if (route.Path === "/vendedores" && getRoleFromLocalStorage() !== "ADMIN") {
                        return null;
                    }
                    if (route.Path === "/gerentes" && getRoleFromLocalStorage() !== "ADMIN") {
                        return null;
                    }

                    if (route.Path === "/orcamentos" && getRoleFromLocalStorage() == "ADMIN") {
                        return null;
                    }
                    return (
                        <SideMenuItem
                            key={index}
                            Icon={route.Icon}
                            Text={route.Text}
                            Path={route.Path}
                        />
                    );
                })}
            </Content>
        </Container>
    );
}

export default SideMenu;
