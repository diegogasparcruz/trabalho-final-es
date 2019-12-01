import React, { useState } from 'react';
import { Form, Col, Button, Container, Image, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import best_place from '../../assets/friends_online.svg'

import api from '../../service/api'

export default function FormDependents({ userId }) {

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [genre, setGenre] = useState('M');


    const saveDependent = async () => {

        const data = {
            "name": name,
            "genre": genre,
            "dt_nasc": dtNasc
        }

        console.log(data)

        try {
            await api.post(`/v1/admin/dependents/employee/${userId}`, data)
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
            saveDependent()
        }

        setValidated(true)
    };

    return (
        <Container className='form-container h-100'>
            <Form className='w-50 form' noValidate validated={validated} onSubmit={handleSubmit}>
                <Container className='my-4'>
                    <Image src={best_place} fluid />
                </Container>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control required onChange={e => setName(e.target.value)} type="text" placeholder="Digite o nome do dependente" />
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
                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Data de Nascimento*</Form.Label>
                            <Form.Control required onChange={e => setDtNasc(e.target.value)} type="date" />

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
