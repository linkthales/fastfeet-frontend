import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  whiteColor,
  dangerColor,
  primaryColor,
  borderColor,
  darkColor,
  grayColor,
  placeholderColor,
} from '~/styles/colors';

export const CustomLink = styled(Link)`
  color: ${props => (props.path.highlight ? grayColor : placeholderColor)};
  font-weight: bold;
  margin-right: 20px;
`;

export const Container = styled.div`
  background: ${whiteColor};
  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    width: 500px;

    img {
      margin-right: 20px;
      padding-right: 20px;
      width: 150px;
      border-right: 1px solid ${borderColor};
    }

    /* a {
      font-weight: bold;
      color: ${primaryColor};
      margin-right: 20px;
    } */
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: ${darkColor};
      margin-bottom: 5px;
    }

    button {
      background: none;
      color: ${dangerColor};
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
