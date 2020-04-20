import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import { Form, Container, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

export default function Register(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleNewUser(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            telefone,
            senha
        };

        try{
            const response = await api.post('users', data);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userSenha', response.data.senha);
            localStorage.setItem('userName', response.data.nome);
            localStorage.setItem('userId', response.data.id);

            history.push('/profile');
        }catch(error){ 
            alert('Erro ao cadastrar usuário');
        }
    }


    return(
        <div className="register-container">
            <div className="content">
                <Container>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <section>
                                <h1>Cadastro de Usuário</h1>
                                <p>Faça o cadastro de usuários!</p>

                                <Link className="back-link" to="/">
                                    <FiArrowLeft size={16} color="#326690" />
                                        Já sou cadastrado
                                </Link>
                            </section>
                        </Col>

                        <Col xs={12} md={6} lg={6}>
                            <Form onSubmit={handleNewUser}>
                                
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type="email" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type="text" placeholder="Digite seu telefone" value={telefone} onChange={e => setTelefone(e.target.value)}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type="password" placeholder="Escolha uma senha" value={senha} onChange={e => setSenha(e.target.value)}/>
                                </Form.Group>

                                <button variant="primary" className="button" type="submit">Cadastrar</button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}