import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Row, Col, Button, Modal } from 'react-bootstrap'


import api from '../../service/api'


import notFound from '../../assets/page_not_found.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


import FormDepartments from '../formDepartments/index'

export default function ListDepartments() {

    const [departments, setDepartments] = useState([])

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        async function loadUsers() {
            const usersResponse = await api.get('/v1/admin/departments')
            setDepartments(usersResponse.data.data)
        }

        loadUsers()
    }, [])


    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);

    return (
        <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
            <Row className='align-items-center justify-content-center'>
                <Col>
                    <h1>Departamentos</h1>
                </Col>

                <Col>
                    <Button onClick={handleShow}>
                        <FontAwesomeIcon className='mr-1' icon={faPlus} />
                        Adicionar
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.length > 0
                            ?
                            departments.map(departament => (
                                <tr key={departament.id}>
                                    <td>{departament.id}</td>
                                    <td>{departament.name}</td>
                                    <td>{departament.description}</td>
                                </tr>
                            ))
                            : <tr>
                                <td colSpan='3'>
                                    <Image src={notFound} className='d-flex mx-auto' style={{ width: "250px" }} />
                                    <p className='text-center'>Não há departamentos cadastrados</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>

            <Modal show={showForm} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Cadastro de Usuário </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormDepartments />
                </Modal.Body>
            </Modal>
        </Container >
    )
}
