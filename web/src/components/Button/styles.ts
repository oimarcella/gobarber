import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  width: 340px;
  border-radius: 10px;
  border: none;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;
