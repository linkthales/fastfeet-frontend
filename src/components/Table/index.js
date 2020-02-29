import React from 'react';
import PropTypes from 'prop-types';

import Actions from '~/components/Actions';
import { Container, Header, Row } from './styles';

export default function Table({ headers, rows }) {
  function getObjectProperty(key, object) {
    if (key.includes('.')) {
      const [firstKey, ...restOfKeys] = key.split(/\./);
      const joinedKeys = restOfKeys.join('.');
      const objectFirstKey = object[firstKey];

      if (joinedKeys.includes('.')) {
        const nextObject = getObjectProperty(joinedKeys, objectFirstKey);

        return nextObject;
      }

      return objectFirstKey[joinedKeys];
    }

    return object[key];
  }

  return (
    <Container>
      <thead>
        <Header>
          {headers.map(header => (
            <th key={header.key}>{header.name}</th>
          ))}
          <th>Ações</th>
        </Header>
      </thead>
      <tbody>
        {rows.map(row => (
          <Row key={row.id}>
            {headers.map(header => (
              <td key={header.key}>{getObjectProperty(header.key, row)}</td>
            ))}
            <td>
              <Actions />
            </td>
          </Row>
        ))}
      </tbody>
    </Container>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
