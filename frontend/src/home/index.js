import React, { useState } from 'react'

import {
    Container,
    Image,
    Modal,
    Button
} from 'react-bootstrap'

import './index.css'

import MenuItem from '../components/menuItem/index.js'

import male_avatar from '../assets/male_avatar.svg'

import {
    faUsers,
    faProjectDiagram,
    faTasks,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

export default function Home() {

    const [showModalLogout, setShowLogoutModal] = useState(false)

    const handleClose = () => setShowLogoutModal(false);
    const handleShow = () => setShowLogoutModal(true);

    return (
        <>
            <Container className='bg-dark m-0 h-100 col-lg-2 px-0'>
                <Image src={male_avatar} fluid className='py-2' style={{ padding: '60px' }} />
                <p className='text-white text-center mb-5'>Bem-vindo {'{username}'}</p>

                <Container id='menu-container' className='p-0 m-0'>
                    <MenuItem text='Projetos' icon={faTasks} active />
                    <MenuItem text='Usuários' icon={faUsers} />
                    <MenuItem text='Departamentos' icon={faProjectDiagram} />
                    <MenuItem text='Sair' icon={faSignOutAlt} callback={handleShow} />
                </Container>

            </Container>

            <Modal show={showModalLogout} size='sm' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Confirmação </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tem certeza que deseja sair?</p>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button href='/' variant="danger">Sair</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}