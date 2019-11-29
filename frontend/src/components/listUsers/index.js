import React from 'react'
import { Table, Container } from 'react-bootstrap'

import api from '../../service/api.js'

export default function ListUsers() {

    //const users = await api.get('/v1/admin/users/')
    //console.log(users)

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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>@mdo</td>
                        <td>rua a</td>
                        <td>1010</td>

                    </tr>

                </tbody>
            </Table>
        </Container >
    )
}
