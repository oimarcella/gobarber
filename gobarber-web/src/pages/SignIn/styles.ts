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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;

    h1 {
      margin-top: 80px;
      margin-bottom: 24px;
    }

    a {
      margin-top: 24px;
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
