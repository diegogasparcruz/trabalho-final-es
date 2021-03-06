import React, { useState, useEffect } from 'react'

import {
    Container,
    Image,
    Modal,
    Button,
    Col,
    Row
} from 'react-bootstrap'

import MenuItem from '../components/menuItem/index.js'

import ListProjects from '../components/listProjects/index.js'
import ListUsers from '../components/listUsers/index.js'
import ListDepartaments from '../components/listDepartaments/index.js'

import male_avatar from '../assets/male_avatar.svg'

import {
    faUsers,
    faProjectDiagram,
    faTasks,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import { logout } from '../service/auth'

import api from '../service/api'

export default function Home({ history }) {

    const [showModalLogout, setShowLogoutModal] = useState(false)

    const [user, setUser] = useState([])
    const [userType, setUserType] = useState([])

    useEffect(() => {
        async function loadUser() {
            const userResponse = await api.get('/v1/auth/isLogged')
            setUser(userResponse.data.user)
            setUserType(userResponse.data.user.roles[0].slug) //admin ou supervisor
        }

        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(userType)

    const handleClose = () => setShowLogoutModal(false)
    const handleShow = () => setShowLogoutModal(true)

    const [selected, setSelected] = useState(0)
    const handleSelected = i => setSelected(i)

    const getContent = () => {
        if (userType === 'admin') {
            console.log(0)
            switch (selected) {
                case 0:
                    return <ListProjects admin />
                case 1:
                    return <ListUsers admin homeAdmin />
                case 2:
                    return <ListDepartaments admin />
                default:
                    return <div />
            }

        } else if (userType === 'supervisor') {
            console.log(1)
            switch (selected) {
                case 0:
                    return <ListProjects supervisor />
                default:
                    return <div />
            }
        }
    }

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    return (
        <>
            <Row className='h-100 p-0 m-0'>
                <Col className='col-lg-2 bg-dark m-0 h-100  px-0'>
                    <Image src={male_avatar} fluid className='py-2' style={{ padding: '60px' }} />
                    <p className='text-white text-center mb-5'>Bem-vindo {user.name}</p>

                    <Container id='menu-container' className='p-0 m-0'>

                        < MenuItem text='Projetos' icon={faTasks} callback={() => handleSelected(0)} />
                        {
                            (userType === 'admin')
                                ?
                                <>
                                    <MenuItem text='Usuários' icon={faUsers} callback={() => handleSelected(1)} />
                                    <MenuItem text='Departamentos' icon={faProjectDiagram} callback={() => handleSelected(2)} />
                                </>
                                : null
                        }
                        <MenuItem text='Sair' icon={faSignOutAlt} callback={handleShow} />
                    </Container>
                </Col>

                <Col className='h-100 p-0 m-0'
                    style={{ maxHeight: "100%", overflowY: "scroll" }}>
                    {
                        getContent()
                    }
                </Col>

            </Row>

            <Modal show={showModalLogout} size='sm' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Confirmação </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tem certeza que deseja sair?</p>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleLogout} variant="danger">Sair</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}