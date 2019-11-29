import React, { useState, useEffect } from 'react'
import { Table, Container } from 'react-bootstrap'

import api from '../../service/api.js'

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

            <h1>Usuários</h1>
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
                        users.map(user => (
                            <tr key={user.id}>

                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.salary}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container >
    )
}
