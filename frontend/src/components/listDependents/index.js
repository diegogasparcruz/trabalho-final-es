import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Button, Row, Col, Modal } from 'react-bootstrap'

import api from '../../service/api.js'

import notFound from '../../assets/page_not_found.svg'

import FormDependents from '../formDependents/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { parseISO } from 'date-fns'


export default function ListUsers({ userId }) {

    const [dependents, setDependents] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        async function loadUsers() {
            const projectsResponse = await api.get(`/v1/admin/users/${userId}`)
            setDependents(projectsResponse.data.data[0].dependents)
        }

        loadUsers()
    }, [userId])

    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);

    return (
        <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
            <Row className='align-items-center justify-content-center'>
                <Col>
                    <h1>Dependentes</h1>
                </Col>

                <Col>
                    <Button onClick={handleShow}>
                        <FontAwesomeIcon className='mr-1' icon={faUserPlus} />
                        Adicionar
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Gênero</th>
                        <th>Data de nascimento</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        dependents.length > 0
                            ? dependents.map(dependent => (
                                <tr key={dependent.id}>

                                    <td>{dependent.id}</td>
                                    <td>{dependent.name}</td>
                                    <td>{dependent.genre}</td>
                                    <td>{parseISO(dependent.dt_nasc).toLocaleDateString()}</td>

                                </tr>
                            ))

                            : <tr>
                                <td colSpan='5'>
                                    <Image src={notFound} className='d-flex mx-auto' style={{ width: "250px" }} />
                                    <p className='text-center'>Não há dependentes cadastrados</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>

            <Modal show={showForm} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Cadastro de Dependente </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormDependents userId={userId} />
                </Modal.Body>
            </Modal>
        </Container >
    )
}
