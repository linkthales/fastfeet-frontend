import React, { useState, useRef, useEffect } from 'react';
import {
  MdClose,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import PropTypes from 'prop-types';
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
import { blueColor, dangerColor } from '~/styles/colors';

const headers = [
  { key: 'id', name: 'ID' },
  { key: 'avatar.url', type: 'image', name: 'Foto' },
  { key: 'name', name: 'Nome' },
  { key: 'email', name: 'Email' },
];

export default function Deliveryman({ history }) {
  const formRef = useRef(null);
  const [deliverymans, setDeliverymans] = useState([]);
  const [searchContext, setSearchContext] = useState('');

  async function getDeliverymans(search) {
    const response = await api.get(`/manage-deliverymans?q=${search}`);

    setDeliverymans(response.data);
  }

  async function deleteDeliveryman(deliverymanId) {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o entregador de id ${deliverymanId}?`
      )
    ) {
      await api.delete(`/manage-deliverymans/${deliverymanId}`);

      getDeliverymans(searchContext);
    }
  }

  useEffect(() => {
    getDeliverymans(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  function handleNewDeliveryman() {
    history.push('/deliveryman/0');
  }

  const actions = [
    {
      content: 'Editar',
      icon: MdEdit,
      color: blueColor,
      execute: deliverymanId => {
        history.push(`/deliveryman/${deliverymanId}`);
      },
    },
    {
      content: 'Excluir',
      icon: MdDeleteForever,
      color: dangerColor,
      execute: deliverymanId => {
        deleteDeliveryman(deliverymanId);
      },
    },
  ];

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
                <MdSearch size={20} />
              </button>
            </Form>
          </StyledInput>
        </SearchBox>
        <Button type="button" onClick={handleNewDeliveryman}>
          <MdAdd size={24} /> Cadastrar
        </Button>
      </Action>
      <Table headers={headers} rows={deliverymans} actions={actions} />
    </Container>
  );
}

Deliveryman.propTypes = {
  history: PropTypes.object.isRequired,
};
