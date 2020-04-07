import styled from 'styled-components';
import { lighten } from 'polished';

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

    p {
      max-width: 850px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

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

export const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 110px;
  max-height: 80px;

  background: ${props => lighten(0.35, props.color)};
  border-radius: 15px;

  p {
    color: ${props => props.color};
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 5px;
  }
`;

export const Ball = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.color};
`;
