import React, { useState, useRef, useEffect } from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import { Form } from '@unform/web';

import api from '~/services/api';

import Table from '~/components/Table';
import Input from '~/components/Input';

import { Container, Title, Action, SearchBox, StyledInput } from './styles';

const headers = [
  { key: 'id', name: 'Encomenda' },
  { key: 'product', name: 'Produto' },
  { key: 'last_problem.description', type: 'problem', name: 'Problema' },
];

export default function Problem() {
  const formRef = useRef(null);
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [searchContext, setSearchContext] = useState('');

  async function getDeliveryProblems(search) {
    const response = await api.get(
      `/manage-deliveries?q=${search}&onlyWithProblem=true`
    );

    setDeliveryProblems(response.data);
  }

  useEffect(() => {
    getDeliveryProblems(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  return (
    <Container>
      <Title>Problemas na entrega</Title>
      <Action>
        <SearchBox>
          <StyledInput>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="search" placeholder="Buscar por encomenda" />
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
      </Action>
      <Table headers={headers} rows={deliveryProblems} />
    </Container>
  );
}
