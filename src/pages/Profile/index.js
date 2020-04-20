import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import api from '../../services/api';

export default function Profile(){

    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const[users, setUsers] = useState([]);

    const history = useHistory();


    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
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

                <Link className="button" to="/clients">Listar todos clientes</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>

            </header>

            <h1>Usuários cadastrados</h1>


            <Container>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                               {users.map(user => (
                                   <tr>
                                        <td key={user.id}>{user.id}</td>
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>{user.telefone}</td>
                                   </tr>
                               ))} 

                        </tbody>
                    </Table>
                </Row>
            </Container>
            
            
        </div>
    );
}