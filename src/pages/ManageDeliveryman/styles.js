import styled from 'styled-components';
import { darken } from 'polished';
import {
  whiteColor,
  blackColor,
  borderColor,
  placeholderColor,
  grayColor,
  primaryColor,
} from '~/styles/colors';

export const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 50px;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 34px 0;
    font-size: 24px;
    color: ${grayColor};
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 112px;
    width: 100%;
    color: ${whiteColor};
    background: ${placeholderColor};
    height: 36px;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, placeholderColor)};
    }

    & + button {
      color: ${whiteColor};
      background: ${primaryColor};

      &:hover {
        background: ${darken(0.08, primaryColor)};
      }
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 240px;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: ${whiteColor};
  border-radius: 4px;
  padding: 30px 30px;

  input {
    color: ${blackColor};
    background: ${whiteColor};
    height: 44px;
    width: 100%;
    margin: 0 0 10px;
    padding: 0 15px;
    border: 1px solid ${borderColor};
    border-radius: 4px;

    &::placeholder {
      color: ${placeholderColor};
    }
  }

  span {
    align-self: flex-start;
    color: ${grayColor};
    margin: 0 0 10px;
    font-weight: bold;
  }
`;
