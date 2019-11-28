import React from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';

import './index.css'
import best_place from '../assets/best_place.svg'


export default function Login() {

    return (
        <Container className='form-container h-100'>
            <Form className='col-lg-4 form'>

                <Container className='my-3'>
                    <Image src={best_place} fluid />
                </Container>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="nome@dominio.com" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite sua senha" />
                </Form.Group>

                <Button href='/home' className="w-100" type="submit">
                    Entrar
                </Button>
            </Form>
        </Container>
    )
}