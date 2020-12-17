import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

// import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Background, Content } from './styles';

const SignIn: React.FC = () => {
  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('handleLogin');
  };

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber logo" />
          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </form>

          <Link to="/signUp">
            <FiLogIn />
            Criar conta
          </Link>
        </Content>
        <Background />
      </Container>
    </>
  );
};
export default SignIn;
