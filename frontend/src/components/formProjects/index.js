import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Container, Image } from 'react-bootstrap';

import api from '../../service/api';
import project_completed from '../../assets/project_completed.svg'

export default function ListDepartmentsUsers() {
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])

    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedManager, setSelectedManager] = useState(null)
    const [projectName, setProjectName] = useState('')

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        async function loadDepartments() {
            const departmentsResponse = await api.get('/v1/admin/departments/')
            setDepartments(departmentsResponse.data.data)
        }

        loadDepartments()
    }, [])

    useEffect(() => {
        async function loadUsers() {
            const usersResponse = await api.get('/v1/admin/users/')
            setUsers(usersResponse.data.data)
        }

        loadUsers()
    }, [])

    const saveProject = async () => {

        const data = {
            "department_id": selectedDepartment,
            "user_id": selectedManager,
            "name": projectName,
            "status": 1
        }

        try {
            await api.post('/v1/admin/projects', data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            saveProject()
        }

        setValidated(true)
    };

    return (
        <Container className='form-container w-50'>
            <Form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                <Container>
                    <Image src={project_completed} fluid />
                </Container>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nome *</Form.Label>
                            <Form.Control required type="text" onChange={e => setProjectName(e.target.value)} placeholder="Digite o nome do projeto" />
                            <Form.Control.Feedback type='invalid'>Informe um nome para o projeto</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Departamento</Form.Label>
                            <Form.Control as="select" onChange={e => setSelectedDepartment(e.target.value)}>
                                <option value={null} >Selecione um departamento</option>

                                {
                                    departments.length > 0
                                        ? departments.map(department => (
                                            <option value={department.id} key={department.id}>
                                                {department.name} - {department.description}
                                            </option>
                                        ))

                                        :
                                        <option>Não há departamentos cadastrados</option>
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Gerente do projeto</Form.Label>
                            <Form.Control as="select" onChange={e => setSelectedManager(e.target.value)}>
                                <option value={null} >Selecione um usuário</option>
                                {
                                    users.length > 0
                                        ? users.map(user => (
                                            <option value={user.id} key={user.id}>
                                                {user.name}
                                            </option>
                                        ))
                                        :
                                        <option>Não há usuários cadastrados</option>
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Button className="w-100" type="submit">
                            Cadastrar
                        </Button >
                    </Col>
                </Form.Row>
            </Form>
        </Container>
    )
}

