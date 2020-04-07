import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Button } from './styles';

export default function Pager({ maxPages, currentPage, setCurrentPage }) {
  const pages = useMemo(() => [...Array(maxPages).keys()].map(x => ++x), [
    maxPages,
  ]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <Container>
      <Button
        selected
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdChevronLeft />
      </Button>
      {pages.map(page => (
        <Button
          key={page}
          selected={page === currentPage}
          type="button"
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        selected
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
      >
        <MdChevronRight />
      </Button>
    </Container>
  );
}

Pager.propTypes = {
  maxPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
