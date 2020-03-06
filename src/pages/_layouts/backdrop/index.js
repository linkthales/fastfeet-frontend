import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';
import { dangerColor } from '~/styles/colors';

export default function Backdrop({ children, handleClose }) {
  return (
    <Container>
      <section>
        <button type="button" onClick={handleClose}>
          <MdClose size={20} color={dangerColor} />
        </button>
        {children}
      </section>
    </Container>
  );
}

Backdrop.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};
