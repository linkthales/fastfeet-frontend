import styled from 'styled-components';

import { whiteColor, grayColor, lightGrayColor } from '~/styles/colors';

export const Container = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 21px;
`;

export const Header = styled.tr`
  th {
    text-align: left;
    font-size: 16px;
    color: ${grayColor};

    &:first-child {
      padding-left: 25px;
    }

    &:last-child {
      text-align: right;
      padding-right: 25px;
    }
  }
`;

export const Row = styled.tr`
  td {
    font-size: 16px;
    color: ${lightGrayColor};
    background: ${whiteColor};
    height: 57px;

    &:first-child {
      padding-left: 25px;
    }

    &:last-child {
      text-align: right;
      padding-right: 25px;
    }

    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }
`;
