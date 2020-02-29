import React from 'react';

import Actions from '~/components/Actions';
import { Container, Header, Row } from './styles';

export default function Table() {
  return (
    <Container>
      <Header>
        <th>ID</th>
        <th>Destinatário</th>
        <th>Entregador</th>
        <th>Cidade</th>
        <th>Estado</th>
        <th>Status</th>
        <th>Ações</th>
      </Header>
      <Row>
        <td>#01</td>
        <td>Ludwig van Beethoven</td>
        <td>John Doe</td>
        <td>Rio do Sul</td>
        <td>Santa Catarina</td>
        <td>ENTREGUE</td>
        <td>
          <Actions />
        </td>
      </Row>
      <Row>
        <td>#01</td>
        <td>Ludwig van Beethoven</td>
        <td>John Doe</td>
        <td>Rio do Sul</td>
        <td>Santa Catarina</td>
        <td>ENTREGUE</td>
        <td>
          <Actions />
        </td>
      </Row>
      <Row>
        <td>#01</td>
        <td>Ludwig van Beethoven</td>
        <td>John Doe</td>
        <td>Rio do Sul</td>
        <td>Santa Catarina</td>
        <td>ENTREGUE</td>
        <td>
          <Actions />
        </td>
      </Row>
    </Container>
  );
}
