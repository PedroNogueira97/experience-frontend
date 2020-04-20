import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Container, Row, Col, Form, Table, Modal, Button } from 'react-bootstrap';
import api from '../../services/api';

export default function Clients(){
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    const[clients, setClients] = useState([]);
    const[nome, setNome] = useState([]);
    const[cpf, setCpf] = useState([]);
    const[endereco, setEndereco] = useState([]);
    const[telefone, setTelefone] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleNewClient(){

        const data = {
            nome, 
            cpf,
            endereco,
            telefone
        };

        try{
            await api.post('clients', data);
            
        }catch(error){
            alert('Erro ao cadastrar cliente');
        }
    }

    const history = useHistory();

    useEffect(() => {
        api.get('clients').then(response => {
            setClients(response.data);
        });
    });

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    

    return(
        <div className="profile-container"> 
            <header>

                <span>Bem vindo, {userName}</span>

                <Link className="button" to="/profile">Listar todos usuários</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>

            </header>

            <h1>Clientes cadastrados</h1>

            <button variant="primary" className="button" onClick={handleShow}>Cadastrar novo cliente</button>


            <Container>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                               {clients.map(client => (
                                   <tr>
                                        <td key={client.id}>{client.id}</td>
                                        <td>{client.nome}</td>
                                        <td>{client.cpf}</td>
                                        <td>{client.endereco}</td>
                                        <td>{client.telefone}</td>
                                   </tr>
                               ))} 

                        </tbody>
                    </Table>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar</Modal.Title>
                </Modal.Header>
                
                    <Modal.Body>
                    <Form onSubmit={handleNewClient}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" placeholder="Digite o CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" placeholder="Digite o Endereço" value={endereco} onChange={e => setEndereco(e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" placeholder="Digite o Telefone" value={telefone} onChange={e => setTelefone(e.target.value)}/>
                            </Form.Group>

                            <Button variant="primary" className="Button" type="submit">Cadastrar</Button>
                            
                        </Form>
                    </Modal.Body>
                
            </Modal>
            
        </div>

        
    );
}