import React from 'react';
import { MdClose, MdAdd } from 'react-icons/md';

import api from '~/services/api';

import Table from '~/components/Table';
import { Container, Title, Action, Input, SeachIcon, Button } from './styles';

export default function Delivery() {
  return (
    <Container>
      <Title>Gerenciando encomendas</Title>
      <Action>
        <Input>
          <SeachIcon />
          <input placeholder="Buscar por encomendas" />
          <button type="button">
            <MdClose />
          </button>
        </Input>
        <Button type="button">
          <MdAdd /> Cadastrar
        </Button>
      </Action>
      <Table />
    </Container>
  );
}
