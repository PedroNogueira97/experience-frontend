import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './style.css';
import { Form } from 'react-bootstrap';
import api from '../../services/api';

export default function Logon(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('auth', { email, senha });
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userSenha', response.data.senha);
            localStorage.setItem('userName', response.data.nome);
            localStorage.setItem('userId', response.data.id);

            history.push('/profile');
        }catch(error){ 
            alert('Falha no login');
        }
    }


    return(
        <div className="logon-container">
            <div className="content">
                <section className="form">
                    <Form onSubmit={handleLogin}>
                        <h1>Login do Usuário</h1>

                        <Form.Group controlId="formInputEmail">
                            <Form.Control type="text" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" placeholder="Digite sua senha" value={senha} onChange={e => setSenha(e.target.value)}/>
                        </Form.Group>
                            

                            <button variant="primary" className="button" type="submit">Entrar</button>

                            <Link className="back-link" to="/register">
                                <FiLogIn size={16} color="#326690" />
                                 Não tenho cadastro
                            </Link>
                    </Form>
                </section>
            </div>
        </div>
    );
}