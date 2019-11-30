import React, { useState } from 'react';
import { Form, Col, Button, Container, Image } from 'react-bootstrap';

import best_place from '../../assets/remote_team.svg'
import api from '../../service/api'

export default function FormDepartments() {

    const [validated, setValidated] = useState(false);

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')

    const saveDepartment = () => {
        const data = {
            "name": departmentName,
            "description": departmentDescription
        }

        try {
            api.post('/v1/admin/departments', data)
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
            saveDepartment()
        }

        setValidated(true)
    }

    return (
        <Container className='form-container h-100'>
            <Form className='w-75 form' noValidate validated={validated} onSubmit={handleSubmit}>
                <Container className='my-4'>
                    <Image src={best_place} fluid />
                </Container>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control type="text" required onChange={e => setDepartmentName(e.target.value)} placeholder="Digite o nome do departamento" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" required onChange={e => setDepartmentDescription(e.target.value)} placeholder="Digite a descrição do departamento" />
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

