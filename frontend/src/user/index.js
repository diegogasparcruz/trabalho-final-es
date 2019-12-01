import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'

import api from '../service/api'

import male_avatar from '../assets/male_avatar.svg'
import female_avatar from '../assets/female_avatar.svg'

import { parseISO } from 'date-fns'

import ListDependents from '../components/listDependents/index'

export default function Project(props) {
    const { id: userId } = props.match.params;

    const [user, setUser] = useState({})

    useEffect(() => {
        async function getProjectData() {
            const projectsResponse = await api.get(`/v1/admin/users/${userId}`)
            setUser(projectsResponse.data.data[0])
        }

        getProjectData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container className='pt-5 d-flex align-items-center justify-content-center'>
            <Card className='w-25'>
                {
                    (user.genre === 'F')
                        ? <Card.Img variant="top" src={female_avatar} className='p-2' />
                        : <Card.Img variant="top" src={male_avatar} className='p-2' />
                }

                <Card.Body className='bg-secondary text-white'>
                    <Card.Title className='text-center'>{user.name}</Card.Title>

                    <Card.Text>
                        E-mail: {user.email}
                    </Card.Text>
                    <Card.Text>
                        Endereço: {user.address}
                    </Card.Text>
                    <Card.Text>
                        Salário: {user.salary}
                    </Card.Text>
                    <Card.Text>
                        Nascimento: {parseISO(user.dt_nasc).toLocaleDateString()}
                    </Card.Text>

                </Card.Body>
            </Card>


            <ListDependents user={user} />
        </Container>
    )
}