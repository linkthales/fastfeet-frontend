import React, { useEffect, useState } from 'react';
import { MdClose, MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import Table from '~/components/Table';
import { Container, Title, Action, SearchBox, Input, Button } from './styles';

const headers = [
  { key: 'id', name: 'ID' },
  { key: 'recipient.name', name: 'Destinatário' },
  { key: 'deliveryman.name', name: 'Entregador' },
  { key: 'recipient.city', name: 'Cidade' },
  { key: 'recipient.state', name: 'Estado' },
  { key: 'recipient.street', name: 'Status' },
];

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function getDeliveries() {
      const response = await api.get('/manage-deliveries');

      setDeliveries(response.data);
    }

    getDeliveries();
  }, []);

  return (
    <Container>
      <Title>Gerenciando encomendas</Title>
      <Action>
        <SearchBox>
          <Input>
            <input placeholder="Buscar por encomendas" />
            <button type="button">
              <MdClose />
            </button>
          </Input>
          <button type="button">
            <MdSearch />
          </button>
        </SearchBox>
        <Button type="button">
          <MdAdd /> Cadastrar
        </Button>
      </Action>
      <Table headers={headers} rows={deliveries} />
    </Container>
  );
}
