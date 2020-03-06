import React from 'react';
import PropTypes from 'prop-types';

import Actions from '~/components/Actions';
import { Container, Header, Row } from './styles';

export default function Table({ headers, rows, actions }) {
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

    // if (Array.isArray(object[key])) return object[key];

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
              <td key={header.key}>
                {header.type === 'image' ? (
                  <>
                    <img
                      src={getObjectProperty(header.key, row)}
                      alt={header.key}
                    />
                  </>
                ) : (
                  <p>{getObjectProperty(header.key, row)}</p>
                )}
              </td>
            ))}
            <td>
              <Actions rowId={row.id} actions={actions} />
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
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
