import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Badge, ActionList, Action } from './styles';

export default function Actions({ rowId, actions }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>...</Badge>
      <ActionList visible={visible}>
        {actions.map(action => (
          <Action key={action.content} color={action.color}>
            <button
              type="button"
              onClick={() => {
                setVisible(!visible);
                action.execute(rowId);
              }}
            >
              <action.icon />
              <span>{action.content}</span>
            </button>
          </Action>
        ))}
      </ActionList>
    </Container>
  );
}

Actions.propTypes = {
  rowId: PropTypes.number.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
