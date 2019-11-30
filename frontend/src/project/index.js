import React, { useState, useEffect } from 'react'
import { Container, Card, Col } from 'react-bootstrap'

import api from '../service/api'

import engineer from '../assets/QA_engineers.svg'
import ListUsers from '../components/listUsers';

export default function Project(props) {
    const { id: projectId } = props.match.params;

    const [project, setProject] = useState({})
    const [supervisor, setSupervisor] = useState(null)
    const [department, setDepartment] = useState(null)

    useEffect(() => {
        async function getProjectData() {
            const projectsResponse = await api.get(`/v1/admin/projects/${projectId}`)
            setProject(projectsResponse.data.data[0])

            //buscando supervisor do projeto
            if (projectsResponse.data.data[0].user_id) {
                const user = await api.get(`/v1/admin/users/${projectsResponse.data.data[0].user_id}`)
                setSupervisor(user.data.data[0])
            }

            //buscando departamento do projeto
            if (projectsResponse.data.data[0].department_id) {
                const department = await api.get(`/v1/admin/departments/${projectsResponse.data.data[0].department_id}`)
                setDepartment(department.data.data)
            }

        }

        getProjectData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container className='mt-5 '>
            <Col className='d-flex flex-column align-items-center justify-content-center'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={engineer} className='p-2' />
                    <Card.Body className='bg-secondary text-white'>
                        <Card.Title className='text-center'>{project.name}</Card.Title>
                        <Card.Text>
                            Supervisor: {supervisor != null ? supervisor.name : 'não alocado'}
                        </Card.Text>

                        <Card.Text>
                            Status: {project.status === 1 ? 'em andamento' : 'encerrado'}
                        </Card.Text>

                        <Card.Text>
                            Departamento: {department != null ? department.name : 'não alocado'}
                        </Card.Text>

                    </Card.Body>
                </Card>

                <ListUsers project={project} />
            </Col>
        </Container>
    )
}