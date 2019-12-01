/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Button, Row, Col, Modal, Form } from 'react-bootstrap'

import api from '../../service/api.js'

import notFound from '../../assets/page_not_found.svg'

import FormUser from '../formUsers/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ListUsers({ project, supervisor, admin, homeAdmin }) {

    console.log(project, supervisor, admin, homeAdmin)
    console.log('u&u', admin && homeAdmin)
    const [users, setUsers] = useState([])
    const [avaliableUsers, setAvaliableUsers] = useState([])

    const [showCadForm, setshowCadForm] = useState(false)
    const [showAddProjForm, setshowAddProjForm] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        async function loadUsers() {

            if (project) {
                if (admin) {
                    const usersResponse = await api.get(`/v1/admin/projects/${project.id}`)
                    setUsers(usersResponse.data.data[0].users)

                    const avaliableUsersResponse = await api.get('/v1/admin/employeesNotProject')
                    setAvaliableUsers(avaliableUsersResponse.data.data)
                } else if (supervisor) {
                    const usersResponse = await api.get('/v1/supervisors/projects')
                    setUsers(usersResponse.data.data[0].users)

                    const avaliableUsersResponse = await api.get('/v1/supervisors/projects/employee/NotProjects')
                    setAvaliableUsers(avaliableUsersResponse.data.data)
                }

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

    const handleAddToProject = async () => {
        await api.post('/v1/supervisors/projects/storeUser/', { user_id: selectedUser })
        window.location.reload()
    }

    const handleDelete = async userId => {
        await api.get(`/v1/supervisors/projects/removeUser/${userId}`)
        window.location.reload()
    }

    return (
        <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
            <Row className='align-items-center justify-content-center'>
                <Col>
                    <h1>Usuários</h1>
                </Col>

                <Col>
                    {
                        (supervisor | (admin & homeAdmin))
                            ? <>
                                <Button onClick={handleShow}>
                                    <FontAwesomeIcon className='mr-1' icon={faUserPlus} />
                                    Adicionar
                                </Button>
                            </>
                            : null
                    }
                </Col>
            </Row>

            <Table responsive striped bordered hover  >
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

                                    {
                                        (admin)
                                            ? <td className='m-0 px-0 d-flex justify-content-center align-items-center'>
                                                <Button target='_blank' href={`/user/${user.id}`}>
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </Button>
                                            </td>
                                            : <td className='m-0 px-0 d-flex justify-content-center align-items-center'>
                                                <Button onClick={() => handleDelete(user.id)}>
                                                    <FontAwesomeIcon className='mr-1' icon={faTrash} />
                                                </Button>
                                            </td>
                                    }
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
                    <Form>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Adicione uma pessoa ao projeto</Form.Label>
                            <Form.Control as="select" onChange={e => setSelectedUser(e.target.value)}>
                                <option value={null} >Selecione um usuário</option>
                                {
                                    avaliableUsers && avaliableUsers.length > 0
                                        ? avaliableUsers.map(user => (
                                            <option value={user.id} key={user.id}>
                                                {user.name}
                                            </option>
                                        ))
                                        :
                                        <option>Não há usuários disponíveis</option>
                                }
                            </Form.Control>
                        </Form.Group>


                    </Form>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" onClick={handleAddToProject} >Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}
