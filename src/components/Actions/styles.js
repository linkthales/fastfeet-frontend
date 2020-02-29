import styled from 'styled-components';

import { placeholderColor, whiteColor, borderColor } from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  margin-left: auto;
  max-width: 35px;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  color: ${placeholderColor};
  font-size: 26px;
  padding: 0 7px 13px;
`;

export const ActionList = styled.div`
  z-index: 100;
  position: absolute;
  width: 150px;
  top: calc(100%);
  left: calc(50% - 75px);
  background: ${whiteColor};
  border: 1px solid ${borderColor};
  border-radius: 4px;
  padding: 10px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: -7px;
    left: calc(50% - 7px);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid ${borderColor};
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: -6px;
    left: calc(50% - 6px);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${whiteColor};
  }
`;

export const Action = styled.div`
  color: ${whiteColor};

  & + div {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid ${borderColor};
  }

  button {
    text-align: left;
    width: 130px;
    height: 26px;
    background: none;
    border: 0;
    position: relative;

    color: ${props => props.color};

    span {
      margin-left: 10px;
      color: ${placeholderColor};
    }
  }
`;
