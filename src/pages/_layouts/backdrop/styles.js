import styled from 'styled-components';

import { backdropColor } from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 50;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${backdropColor};

  section {
    min-width: 450px;
    min-height: 400px;
    border-radius: 5px;
    padding: 25px;
    position: relative;
    background: white;

    > button {
      position: absolute;
      top: 25px;
      right: 25px;
      background: none;
      border: 0;
    }
  }
`;
