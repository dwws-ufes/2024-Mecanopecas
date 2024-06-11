import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles.ts'

interface SideMenuItemProps {
    Icon: React.ElementType;
    Text: string;
    Path: string;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({ Icon, Text, Path }) => {
    return (
        <Container>
            <Link to={Path.toLowerCase()} style={{textDecoration: 'none'}}>
                <Icon />
                {Text}
            </Link>
        </Container>
    )
}

export default SideMenuItem
