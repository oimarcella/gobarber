import React from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Background, Content } from './styles';

const SignIn: React.FC = () => (
  <>
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber logo" />
        <form>
          <h1>Faça seu login</h1>

          <input type="text" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="forgot">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  </>
);
export default SignIn;
