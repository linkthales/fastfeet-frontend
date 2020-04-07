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

import { toast } from 'react-toastify';
import api from '~/services/api';

import Backdrop from '../_layouts/backdrop';
import Table from '~/components/Table';
import Input from '~/components/Input';
import Pager from '~/components/Pager';
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
  { key: 'name', name: 'Nome' },
  { key: 'full_address', name: 'Endereço' },
];

export default function Recipient({ history }) {
  const formRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipients, setRecipients] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [searchContext, setSearchContext] = useState('');

  async function getRecipients(search) {
    const response = await api.get(
      `/manage-recipients?q=${search}&page=${currentPage}`
    );

    const { pages: maxPages, recipients: newRecipients } = response.data;

    setPages(maxPages);
    setRecipients(newRecipients);
  }

  async function deleteRecipient(recipientId) {
    try {
      await api.delete(`/manage-recipients/${recipientId}`);

      getRecipients(searchContext);
      setOpenConfirmation(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    getRecipients(searchContext);
  }, [searchContext]);

  useEffect(() => {
    getRecipients(searchContext);
  }, [currentPage]);

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
        const recipient = recipients.find(iRecipient => {
          return iRecipient.id === recipientId;
        });

        setCurrentRecipient(recipient);
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
            title="Excluir destinatário"
            message={`Deseja realmente excluir o destinatário ${currentRecipient.name} de id = ${currentRecipient.id}?`}
            confirmAction={() => setOpenConfirmation(false)}
            cancelAction={() => deleteRecipient(currentRecipient.id)}
          />
        </Backdrop>
      )}

      <Container>
        <div>
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

Recipient.propTypes = {
  history: PropTypes.object.isRequired,
};
