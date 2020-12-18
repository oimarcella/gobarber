import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  hasError: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #232129;
  border-radius: 10px;
  padding: 10px;
  width: 340px;

  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `}

  ${props =>
    props.hasError &&
    css`
      color: #cd352e;
      border: 2px solid #cd352e;
    `}

  input {
    flex: 1;
    color: #f4ede8;
    background: transparent;
    border: none;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      box-shadow: 0 0 0px 1000px #232129 inset;
      transition: 'color 9999s ease-out, background-color 9999s ease-out';
      transition-delay: 9999s;
    }
  }
  svg {
    margin-right: 10px;
  }
`;
