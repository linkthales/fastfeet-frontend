import styled from 'styled-components';
import { darken, lighten } from 'polished';
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

export const Row = styled.div`
  display: flex;
`;

export const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 405px;
  margin: 10px 16px;

  .react-select__value-container,
  .react-select__control {
    display: flex;
    align-items: center;
    height: 44px;
    width: 405px;
  }

  .react-select__placeholder,
  .react-select__single-value {
    top: 60%;
  }

  .css-2b097c-container,
  .css-1pahdxg-control,
  .css-1pahdxg-control:hover {
    border-color: ${placeholderColor};
    box-shadow: none;
  }

  .react-select__option--is-selected {
    background: ${lighten(0.12, primaryColor)};
  }

  .react-select__option--is-focused {
    background: ${lighten(0.2, primaryColor)};
    color: ${whiteColor};

    &:active {
      background: ${lighten(0.12, primaryColor)};
    }
  }

  .react-select__menu {
    margin-top: -3px;
  }
`;
