import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Row, Col, Button } from 'react-bootstrap'

import api from '../../service/api'

import notFound from '../../assets/page_not_found.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function ListProjects() {

    const [projects, setProjetcts] = useState([])
    const [supervisorNames, setSupervisorNames] = useState([])

    useEffect(() => {
        async function loadUsers() {

            const projectsResponse = await api.get('/v1/admin/projects')
            setProjetcts(projectsResponse.data.data)


            //buscando nomes dos supervisores
            let names = []

            for (let i = 0; i < projectsResponse.data.data.length; i++) {
                try {
                    if (projectsResponse.data.data[i].user_id) {
                        const user = await api.get(`/v1/admin/users/${projectsResponse.data.data[i].user_id}`)
                        const name = user.data.data[0].name
                        names.push(name)
                    }
                } catch (err) {
                    names.push('')
                    console.log(err)
                }
            }
            setSupervisorNames(names)
        }


        loadUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>

            <Row className='align-items-center justify-content-center'>
                <Col>
                    <h1>Projetos</h1>
                </Col>

                <Col>
                    <Button>
                        <FontAwesomeIcon className='mr-1' icon={faPlus} />
                        Adicionar
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome do projeto</th>
                        <th>Supervisor</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.length > 0
                            ? projects.map((project, index) => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{supervisorNames[index]}</td>
                                    <td>{project.status === 1 ? 'Em andamento' : 'Encerrado'}</td>
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
        </Container >
    )
}
