import React, { useState, FormEvent } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Background, Content } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('handleLogin() called');
    console.log(email, password);
  };

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber logo" />
          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </form>

          <a href="login">
            <FiLogIn />
            Criar conta
          </a>
        </Content>
        <Background />
      </Container>
    </>
  );
};
export default SignIn;
