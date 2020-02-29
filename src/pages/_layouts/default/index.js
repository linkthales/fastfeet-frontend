import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper, Body } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
