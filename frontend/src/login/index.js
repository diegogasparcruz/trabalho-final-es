import React, { useState } from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';

import './index.css'
import best_place from '../assets/best_place.svg'

import api from '../service/api'

export default function Login() {

    const [email, setEmail] = useState('admin@admin.com')
    const [password, setPassword] = useState('admin')



    const handleLogin = async function (e) {
        e.preventDefault()
        console.log(email, password)

        const token = await api.post('/v1/auth/login', { email, password })
        console.log(token)
    }

    return (
        <Container className='form-container h-100'>
            <Form className='col-lg-4 form'>

                <Container className='my-3'>
                    <Image src={best_place} fluid />
                </Container>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="nome@dominio.com" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
                </Form.Group>

                <Button onClick={handleLogin} className="w-100" type="submit">
                    Entrar
                </Button>
            </Form>
        </Container>
    )
}