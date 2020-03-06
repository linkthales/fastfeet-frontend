import React, { useState, useRef, useEffect } from 'react';
import {
  MdClose,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

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
import { blueColor, dangerColor } from '~/styles/colors';

const headers = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Nome' },
  { key: 'full_address', name: 'Endereço' },
];

export default function Recipient({ history }) {
  const formRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [searchContext, setSearchContext] = useState('');

  async function getRecipients(search) {
    const response = await api.get(`/manage-recipients?q=${search}`);

    setRecipients(response.data);
  }

  async function deleteRecipient(recipientId) {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o destinatário de id ${recipientId}?`
      )
    ) {
      await api.delete(`/manage-recipients/${recipientId}`);

      getRecipients(searchContext);
    }
  }

  useEffect(() => {
    getRecipients(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  function handleNewRecipient() {
    history.push('/recipient/0');
  }

  const actions = [
    {
      content: 'Editar',
      icon: MdEdit,
      color: blueColor,
      execute: recipientId => {
        history.push(`/recipient/${recipientId}`);
      },
    },
    {
      content: 'Excluir',
      icon: MdDeleteForever,
      color: dangerColor,
      execute: recipientId => {
        deleteRecipient(recipientId);
      },
    },
  ];

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
                <MdSearch size={20} />
              </button>
            </Form>
          </StyledInput>
        </SearchBox>
        <Button type="button" onClick={handleNewRecipient}>
          <MdAdd size={24} /> Cadastrar
        </Button>
      </Action>
      <Table headers={headers} rows={recipients} actions={actions} />
    </Container>
  );
}

Recipient.propTypes = {
  history: PropTypes.object.isRequired,
};
