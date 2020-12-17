import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Background, Content } from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = (data: object): void => {
    console.log('This is handle handleSubmit function', data);
  };

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logoImg} alt="GoBarber logo" />

          <Form initialData={{ name: 'Marcella' }} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </Content>
      </Container>
    </>
  );
};
export default SignUp;
