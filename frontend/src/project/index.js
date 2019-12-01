import React, { useState, useEffect } from 'react'
import { Container, Card, Col, Button } from 'react-bootstrap'

import api from '../service/api'

import engineer from '../assets/QA_engineers.svg'
import ListUsers from '../components/listUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Project(props) {

    console.log(props.history)

    const { supervisor: isSupervisor, admin, project } = props.history.location.state

    const [supervisor, setSupervisor] = useState(null)
    const [department, setDepartment] = useState(null)

    useEffect(() => {
        async function getProjectData() {

            //buscando supervisor do projeto
            if (admin) {
                if (project.user_id) {
                    const user = await api.get(`/v1/admin/users/${project.user_id}`)
                    setSupervisor(user.data.data[0])
                }

                //buscando departamento do projeto
                if (project.department_id) {
                    const department = await api.get(`/v1/admin/departments/${project.department_id}`)
                    setDepartment(department.data.data)
                }
            }
        }

        getProjectData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleBack = () => {
        props.history.goBack()
    }

    return (
        <Container className='mt-5 '>
            {
                project
                    ? <Col className='d-flex flex-column align-items-center justify-content-center'>
                        <Button onClick={handleBack} className='align-self-start'>
                            <FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
                            Voltar
                        </Button>
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

                        <ListUsers supervisor={isSupervisor} admin={admin} project={project} />
                    </Col>
                    : null
            }
        </Container>
    )
}