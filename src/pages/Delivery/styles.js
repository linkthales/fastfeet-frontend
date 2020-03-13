import styled from 'styled-components';
import { darken } from 'polished';

import {
  grayColor,
  blackColor,
  whiteColor,
  placeholderColor,
  borderColor,
  primaryColor,
  lightGrayColor,
} from '~/styles/colors';

export const BackdropContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 300px;

  h3 {
    font-size: 14px;
    color: ${grayColor};
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: ${lightGrayColor};
    margin-bottom: 10px;
  }

  img {
    max-width: 400px;
    max-height: 200px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85vh;

  max-width: 100%;
  width: 1200px;
  margin: 0 40px;
`;

export const Title = styled.h1`
  margin: 34px 0;
  font-size: 24px;
  color: ${grayColor};
`;

export const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button + button {
    color: ${whiteColor};
    background: ${primaryColor};
    height: 36px;
    width: 36px;
    margin: -12px -50px 0 0;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, primaryColor)};
    }
  }

  label {
    margin-left: 50px;
    cursor: pointer;

    input {
      cursor: pointer;
    }

    span {
      margin-left: 5px;
    }
  }
`;

export const StyledInput = styled.div`
  position: relative;
  height: 36px;
  margin-right: 5px;

  input {
    color: ${blackColor};
    background: ${whiteColor};
    height: 36px;
    margin: 0 0 10px;
    padding: 0 25px 0 10px;
    border: 1px solid ${borderColor};
    border-radius: 4px;

    &::placeholder {
      color: ${placeholderColor};
    }
  }

  button {
    position: absolute;
    top: 12px;
    right: 8px;
    color: ${grayColor};
    background: none;
    border: 0;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${whiteColor};
  background: ${primaryColor};
  height: 36px;
  width: 142px;
  margin: 5px 0 0;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, primaryColor)};
  }
`;
