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
  align-items: center;
  align-content: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  > a {
    justify-content: center;
    color: #ff9000;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }

  svg {
    margin-right: 16px;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
    button {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;

      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
