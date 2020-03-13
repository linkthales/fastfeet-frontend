import styled from 'styled-components';
import { lighten, darken } from 'polished';

import { whiteColor, primaryColor } from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-collapse: separate;
  border-spacing: 0 21px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${whiteColor};
  background: ${props =>
    props.selected ? primaryColor : lighten(0.1, primaryColor)};
  height: 36px;
  width: 36px;
  margin: 10px 5px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.2s;

  &:disabled {
    cursor: not-allowed;
    background: ${lighten(0.25, primaryColor)};
  }

  &:not(:disabled) {
    &:hover {
      background: ${darken(0.03, primaryColor)};
    }
  }
`;
