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
  { key: 'name', name: 'Nome' },
  { key: 'full_address', name: 'Endereço' },
];

export default function Recipient() {
  const formRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [searchContext, setSearchContext] = useState('');

  async function getRecipients(search) {
    const response = await api.get(`/manage-recipients?q=${search}`);

    setRecipients(response.data);
  }

  useEffect(() => {
    getRecipients(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  return (
    <Container>
      <Title>Gerenciando destinatários</Title>
      <Action>
        <SearchBox>
          <StyledInput>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="search" placeholder="Buscar por destinatários" />
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
      <Table headers={headers} rows={recipients} />
    </Container>
  );
}
