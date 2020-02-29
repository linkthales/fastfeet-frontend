import React, { useState, useMemo } from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, Badge, NotificationList, Notification } from './styles';
import { primaryColor, blueColor, dangerColor } from '~/styles/colors';

export default function Actions() {
  const [visible, setVisible] = useState(false);
  const [actions, setActions] = useState([
    {
      read: true,
      content: 'Visualizar',
      icon: MdRemoveRedEye,
      color: primaryColor,
    },
    { read: true, content: 'Editar', icon: MdEdit, color: blueColor },
    {
      read: true,
      content: 'Excluir',
      icon: MdDeleteForever,
      color: dangerColor,
    },
  ]);

  const hasUnread = useMemo(
    () => !!actions.find(notification => notification.read === false),
    [actions]
  );

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        ...
        <NotificationList visible={visible}>
          {actions.map(action => (
            <Notification key={action.content} color={action.color}>
              <button type="button">
                <action.icon />
                <span>{action.content}</span>
              </button>
            </Notification>
          ))}
        </NotificationList>
      </Badge>
    </Container>
  );
}
