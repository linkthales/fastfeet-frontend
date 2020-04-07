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

import { toast } from 'react-toastify';
import api from '~/services/api';

import Backdrop from '../_layouts/backdrop';
import Table from '~/components/Table';
import Pager from '~/components/Pager';
import Input from '~/components/Input';
import Confirmation from '~/components/Confirmation';

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
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deliverymans, setDeliverymans] = useState([]);
  const [currentDeliveryman, setCurrentDeliveryman] = useState({});
  const [searchContext, setSearchContext] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);

  async function getDeliverymans(search) {
    const response = await api.get(
      `/manage-deliverymans?q=${search}&page=${currentPage}`
    );

    const { pages: maxPages, deliverymans: newDeliverymans } = response.data;

    setPages(maxPages);
    setDeliverymans(newDeliverymans);
  }

  async function deleteDeliveryman(deliverymanId) {
    try {
      await api.delete(`/manage-deliverymans/${deliverymanId}`);

      getDeliverymans(searchContext);
      setOpenConfirmation(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    getDeliverymans(searchContext);
  }, [searchContext]);

  useEffect(() => {
    getDeliverymans(searchContext);
  }, [currentPage]);

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
        const deliveryman = deliverymans.find(iDeliveryman => {
          return iDeliveryman.id === deliverymanId;
        });

        setCurrentDeliveryman(deliveryman);
        setOpenConfirmation(true);
      },
    },
  ];

  return (
    <>
      {openConfirmation && (
        <Backdrop
          handleClose={() => {
            setOpenConfirmation(false);
          }}
        >
          <Confirmation
            title="Excluir entregador"
            message={`Deseja realmente excluir o entregador ${currentDeliveryman.name} de id = ${currentDeliveryman.id}?`}
            confirmAction={() => setOpenConfirmation(false)}
            cancelAction={() => deleteDeliveryman(currentDeliveryman.id)}
          />
        </Backdrop>
      )}

      <Container>
        <div>
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
        </div>
        {pages && (
          <Pager
            maxPages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </>
  );
}

Deliveryman.propTypes = {
  history: PropTypes.object.isRequired,
};
