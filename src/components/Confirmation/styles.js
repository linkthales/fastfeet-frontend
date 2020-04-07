import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 400px;
`;

export const Title = styled.h1``;

export const Message = styled.p``;
export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => props.background};
  background: ${props => props.color};
  height: 36px;
  width: 142px;
  margin: 5px 0 0 20px;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${props => darken(0.03, props.color)};
  }
`;
