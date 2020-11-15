import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  align-items: center;
  width: 100%;
  max-width: 700px;

  a {
    justify-content: center;
    color: #ff9000;
  }

  svg {
    margin-right: 23px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;

    h1 {
      margin-top: 80px;
      margin-bottom: 24px;
    }

    input {
      height: 56px;
      width: 340px;
      color: #fff;
      padding: 10px;
      border-radius: 10px;
      background: #232129;
      border: 2px solid #232129;

      & + input {
        margin-top: 8px;
      }
      & + button {
        margin-top: 24px;
      }
    }
    a {
      margin-top: 24px;
      color: #fff;
    }

    button {
      background: #ff9000;
      height: 56px;
      width: 340px;
      border-radius: 10px;
      border: none;
      margin-bottom: 24px;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${shade(0.2, '#ff9000')};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
