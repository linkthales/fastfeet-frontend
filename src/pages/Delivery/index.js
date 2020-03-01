import React, { useState, useRef, useEffect } from 'react';
import { MdClose, MdAdd, MdSearch } from 'react-icons/md';
import { Form } from '@unform/web';

import api from '~/services/api';

import Table from '~/components/Table';
import Input from '~/components/Input';

import {
  Container,
  Title,
  Action,
  SearchBox,
  StyledInput,
  Button,
} from './styles';

const headers = [
  { key: 'id', name: 'ID' },
  { key: 'recipient.name', name: 'Destinatário' },
  { key: 'product', name: 'Produto' },
  { key: 'deliveryman.avatar.url', type: 'image', name: '' },
  { key: 'deliveryman.name', name: 'Entregador' },
  { key: 'recipient.city', name: 'Cidade' },
  { key: 'recipient.state', name: 'Estado' },
  { key: 'recipient.street', name: 'Status' },
];

export default function Delivery() {
  const formRef = useRef(null);
  const [deliveries, setDeliveries] = useState([]);
  const [searchContext, setSearchContext] = useState('');

  async function getDeliveries(search) {
    const response = await api.get(`/manage-deliveries?q=${search}`);

    setDeliveries(response.data);
  }

  useEffect(() => {
    getDeliveries(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  return (
    <Container>
      <Title>Gerenciando encomendas</Title>
      <Action>
        <SearchBox>
          <StyledInput>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="search" placeholder="Buscar por encomendas" />
              <button
                type="button"
                onClick={() => {
                  formRef.current.reset();
                  setSearchContext('');
                }}
              >
                <MdClose />
              </button>
              <button type="submit">
                <MdSearch />
              </button>
            </Form>
          </StyledInput>
        </SearchBox>
        <Button type="button">
          <MdAdd /> Cadastrar
        </Button>
      </Action>
      <Table headers={headers} rows={deliveries} />
    </Container>
  );
}
