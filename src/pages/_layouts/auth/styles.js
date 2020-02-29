import styled from 'styled-components';
import { darken } from 'polished';

import {
  primaryColor,
  whiteColor,
  placeholderColor,
  blackColor,
  lightRedColor,
  darkGrayColor,
  grayColor,
  borderColor,
} from '~/styles/colors';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: ${primaryColor};
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: ${whiteColor};
  padding: 60px 30px;
  border: 1px solid ${darkGrayColor};
  border-radius: 4px;

  img {
    width: 223px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      color: ${blackColor};
      background: ${whiteColor};
      height: 44px;
      margin: 0 0 10px;
      padding: 0 15px;
      border: 1px solid ${borderColor};
      border-radius: 4px;

      &::placeholder {
        color: ${placeholderColor};
      }
    }

    span.label {
      align-self: flex-start;
      color: ${grayColor};
      margin: 0 0 10px;
      font-weight: bold;
    }

    span {
      align-self: flex-start;
      color: ${lightRedColor};
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      color: ${whiteColor};
      background: ${primaryColor};
      height: 44px;
      margin: 5px 0 0;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, primaryColor)};
      }
    }

    a {
      color: ${whiteColor};
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
