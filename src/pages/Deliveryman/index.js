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
  { key: 'avatar.url', type: 'image', name: 'Foto' },
  { key: 'name', name: 'Nome' },
  { key: 'email', name: 'Email' },
];

export default function Deliveryman() {
  const formRef = useRef(null);
  const [deliverymans, setDeliverymans] = useState([]);
  const [searchContext, setSearchContext] = useState('');

  async function getDeliverymans(search) {
    const response = await api.get(`/manage-deliverymans?q=${search}`);

    setDeliverymans(response.data);
  }

  useEffect(() => {
    getDeliverymans(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  return (
    <Container>
      <Title>Gerenciando entregadores</Title>
      <Action>
        <SearchBox>
          <StyledInput>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="search" placeholder="Buscar por entregadores" />
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
      <Table headers={headers} rows={deliverymans} />
    </Container>
  );
}
