import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Container, Image, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import api from '../../service/api';
import best_place from '../../assets/personal_info.svg'

export default function ListDepartments() {

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        async function loadDepartments() {
            const departmentsResponse = await api.get('/v1/admin/departments/')
            setDepartments(departmentsResponse.data.data)
        }

        loadDepartments()
    }, [])

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [genre, setGenre] = useState('M')
    const [salary, setSalary] = useState(0)
    const [dtNasc, setDtNasc] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')


    const saveUser = () => {
        const data = {
            "id_department": selectedDepartment,
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "genre": genre,
            "salary": salary,
            "dt_nasc": dtNasc
        }

        try {
            api.post('/v1/admin/users', data)
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
            saveUser()
        }

        setValidated(true)
    }

    return (
        <Container className='form-container w-50'>
            <Form className='form' noValidate validated={validated} onSubmit={handleSubmit} >
                <Container>
                    <Image src={best_place} fluid />
                </Container>

                <Form.Row className='mt-3'>
                    <Col>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control required type="text" onChange={e => setName(e.target.value)} placeholder="Digite o nome do usuário" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail*</Form.Label>
                            <Form.Control required type="email" onChange={e => setEmail(e.target.value)} placeholder="E-mail do usuário" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha*</Form.Label>
                            <Form.Control required name='up' onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha do usuário" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Label>Gênero</Form.Label>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <ButtonToolbar className="mb-2" onChange={e => setGenre(e.target.value)}>
                            <ToggleButtonGroup type="radio" name="options" defaultValue="M">
                                <ToggleButton value="M">Masculino</ToggleButton>
                                <ToggleButton value="F">Feminino</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control required type="text" onChange={e => setAddress(e.target.value)} placeholder="Ex: Rua Azul, nº10 - São Paulo - SP" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicSalary">
                            <Form.Label>Salário</Form.Label>
                            <Form.Control required type="number" onChange={e => setSalary(e.target.value)} placeholder="Digite o salário do usuário" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control required onChange={e => setDtNasc(e.target.value)} type="date" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>

                        <Form.Group controlId="formGridState">
                            <Form.Label>Departamento</Form.Label>
                            <Form.Control as="select" onChange={e => setSelectedDepartment(e.target.value)}>
                                <option>Selecione um departamento</option>

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
                        <Button className="w-100" type="submit">
                            Cadastrar
                        </Button >
                    </Col>
                </Form.Row>
            </Form>
        </Container>
    )
}
