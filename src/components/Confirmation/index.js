import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title, Message, Actions, Button } from './styles';
import { backgroundColor, dangerColor, whiteColor } from '~/styles/colors';

export default function Confirmation({
  title,
  message,
  confirmAction,
  cancelAction,
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Actions>
        <Button
          color={backgroundColor}
          background={dangerColor}
          onClick={confirmAction}
        >
          Cancelar
        </Button>
        <Button
          color={dangerColor}
          background={whiteColor}
          onClick={cancelAction}
        >
          Confirmar
        </Button>
      </Actions>
    </Container>
  );
}

Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
};
