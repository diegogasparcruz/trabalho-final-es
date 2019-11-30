/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Button, Row, Col, Modal, Form } from 'react-bootstrap'

import api from '../../service/api.js'

import notFound from '../../assets/page_not_found.svg'

import FormUser from '../formUsers/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function ListUsers({ project }) {

    const [users, setUsers] = useState([])

    const [showCadForm, setshowCadForm] = useState(false)
    const [showAddProjForm, setshowAddProjForm] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        async function loadUsers() {

            if (project) {
                setUsers(project.users)
            } else {
                const usersResponse = await api.get('/v1/admin/users/')
                setUsers(usersResponse.data.data)
            }
        }

        loadUsers()
    }, [project])

    const handleClose = () => {
        setshowAddProjForm(false)
        setshowCadForm(false)
    }

    const handleShow = () => {
        if (project) {
            setshowAddProjForm(true)
        }
        else {
            setshowCadForm(true)
        }
    }


    return (
        <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
            <Row className='align-items-center justify-content-center'>
                <Col>
                    <h1>Usuários</h1>
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
                        <th>Nome do usuário</th>
                        <th>E-mail</th>
                        <th>Endereço</th>
                        <th>Salário</th>
                        <th>Info</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users && users.length > 0
                            ? users.map(user => (
                                <tr key={user.id}>

                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.salary}</td>
                                    <td className='m-0 px-0 d-flex justify-content-center align-items-center'>
                                        <Button target='_blank' href={`/user/${user.id}`}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                    </td>

                                </tr>
                            ))

                            : <tr>
                                <td colSpan='6'>
                                    <Image src={notFound} className='d-flex mx-auto' style={{ width: "250px" }} />
                                    <p className='text-center'>Não há usuários cadastrados</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>



            <Modal show={showCadForm} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Cadastro de Usuário </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormUser />
                </Modal.Body>
            </Modal>

            <Modal show={showAddProjForm} size='sm' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Confirmação </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Adicione uma pessoa ao projeto</Form.Label>
                        <Form.Control as="select" onChange={e => setSelectedUser(e.target.value)}>
                            <option value={null} >Selecione um usuário</option>
                            {
                                users && users.length > 0
                                    ? users.map(user => (
                                        <option value={user.id} key={user.id}>
                                            {user.name}
                                        </option>
                                    ))
                                    :
                                    <option>Não há usuários disponíveis</option>
                            }
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary">Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}
