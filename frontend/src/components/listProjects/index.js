import React, { useState, useEffect } from 'react'
import { Table, Container, Image, Row, Col, Button, Modal } from 'react-bootstrap'

import api from '../../service/api'

import notFound from '../../assets/page_not_found.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'


import FormProjects from '../formProjects/index'

export default function ListProjects() {

    const [projects, setProjetcts] = useState([])
    const [supervisorNames, setSupervisorNames] = useState([])

    const [showCadForm, setShowCadForm] = useState(false)


    const handleClose = () => setShowCadForm(false);
    const handleShow = () => setShowCadForm(true);


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
                        names[projectsResponse.data.data[i].id] = name
                    }
                } catch (err) {
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
                        <th>Nome do projeto</th>
                        <th>Supervisor</th>
                        <th>Status</th>
                        <th className='px-0 text-center'>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.length > 0
                            ? projects.map(project => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{supervisorNames[project.id]}</td>
                                    <td>{project.status === 1 ? 'Em andamento' : 'Encerrado'}</td>
                                    <td className='m-0 px-0 d-flex justify-content-center align-items-center'>
                                        <Button target='_blank' href={`/project/${project.id}`}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                    </td>

                                </tr>
                            ))
                            : <tr>
                                <td colSpan='5'>
                                    <Image src={notFound} className='d-flex mx-auto' style={{ width: "250px" }} />
                                    <p className='text-center'>Não há departamentos cadastrados</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>



            <Modal show={showCadForm} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> Cadastro de Projeto </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormProjects />
                </Modal.Body>
            </Modal>

        </Container >
    )
}
