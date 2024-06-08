import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles'

const SideMenuItem = ({ Icon, Text, Path }) => {
    return (
        <Container>
            <Link exact to={`/`+Path.toLowerCase()} style={{textDecoration: 'none'}}>
                <Icon />
                {Text}
            </Link>
        </Container>
    )
}

export default SideMenuItem