import React, { useState, FormEvent } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Background, Content } from './styles';

interface UserData {
  authenticationToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState<UserData>({} as UserData);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const responseLogin = await api.post('/sessions/', { email, password });
    console.log('Imprimindo', responseLogin.data);
    setLogin(responseLogin.data);
  };

  console.log('Olá', login.user.name);

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
