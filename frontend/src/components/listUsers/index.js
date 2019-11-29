import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Button, Row, Col } from 'react-bootstrap'

import api from '../../service/api.js'


import notFound from '../../assets/page_not_found.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const usersResponse = await api.get('/v1/admin/users/')
            setUsers(usersResponse.data.data)
        }

        loadUsers()
    }, [])


    return (
        <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
            <Row className='align-items-center justify-content-center'>
                <Col>
                    <h1>Usuários</h1>
                </Col>

                <Col>
                    <Button>
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
                    </tr>
                </thead>

                <tbody>
                    {
                        users.length > 0
                            ? users.map(user => (
                                <tr key={user.id}>

                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.salary}</td>

                                </tr>
                            ))

                            : <tr>
                                <td colSpan='5'>
                                    <Image src={notFound} className='d-flex mx-auto' style={{ width: "250px" }} />
                                    <p className='text-center'>Não há usuários cadastrados</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </Container >
    )
}
