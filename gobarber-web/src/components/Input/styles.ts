import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 10px;
  width: 340px;
  color: #666360;
  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 10px;
  }

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
`;
