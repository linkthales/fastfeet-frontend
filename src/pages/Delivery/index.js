import React, { useState, useRef, useEffect } from 'react';
import {
  MdClose,
  MdAdd,
  MdSearch,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import Table from '~/components/Table';
import Input from '~/components/Input';
import api from '~/services/api';
import { primaryColor, blueColor, dangerColor } from '~/styles/colors';

import Backdrop from '../_layouts/backdrop';
import {
  BackdropContainer,
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
  { key: 'deliveryman.avatar.url', type: 'image', name: 'Foto' },
  { key: 'deliveryman.name', name: 'Entregador' },
  { key: 'recipient.city', name: 'Cidade' },
  { key: 'recipient.state', name: 'Estado' },
  { key: 'recipient.street', name: 'Status' },
];

export default function Delivery({ history }) {
  const formRef = useRef(null);
  const [deliveries, setDeliveries] = useState([]);
  const [searchContext, setSearchContext] = useState('');
  const [currentDelivery, setCurrentDelivery] = useState({});
  const [openModal, setOpenModal] = useState(false);

  async function getDeliveries(search) {
    const response = await api.get(`/manage-deliveries?q=${search}`);

    setDeliveries(response.data);
  }

  async function deleteDelivery(deliveryId) {
    if (
      window.confirm(
        `Tem certeza que deseja excluir a encomenda de id ${deliveryId}?`
      )
    ) {
      await api.delete(`/manage-deliveries/${deliveryId}`);

      getDeliveries(searchContext);
    }
  }

  useEffect(() => {
    getDeliveries(searchContext);
  }, [searchContext]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  function handleNewDelivery() {
    history.push('/delivery/0');
  }

  const actions = [
    {
      content: 'Visualizar',
      icon: MdRemoveRedEye,
      color: primaryColor,
      execute: deliveryId => {
        const delivery = deliveries.find(iDelivery => {
          return iDelivery.id === deliveryId;
        });

        setCurrentDelivery(delivery);
        setOpenModal(true);
      },
    },
    {
      content: 'Editar',
      icon: MdEdit,
      color: blueColor,
      execute: deliveryId => {
        history.push(`/delivery/${deliveryId}`);
      },
    },
    {
      content: 'Excluir',
      icon: MdDeleteForever,
      color: dangerColor,
      execute: deliveryId => {
        deleteDelivery(deliveryId);
      },
    },
  ];

  return (
    <>
      {openModal && (
        <Backdrop
          handleClose={() => {
            setOpenModal(false);
          }}
        >
          <BackdropContainer>
            <div>
              <h3>Informações da encomenda</h3>
              <p>
                {currentDelivery.recipient.street},{' '}
                {currentDelivery.recipient.street_number}
              </p>
              <p>
                {currentDelivery.recipient.city} -{' '}
                {currentDelivery.recipient.state}
              </p>
              <p>{currentDelivery.recipient.zip_code}</p>
            </div>

            <div>
              <h3>Datas</h3>
              <p>
                <strong>Retirada:</strong> {currentDelivery.start_date}
              </p>
              <p>
                <strong>Entrega:</strong> {currentDelivery.end_date}
              </p>
            </div>

            <div>
              <h3>Assinatura do destinatário</h3>
              <img
                src={currentDelivery.signature}
                alt={currentDelivery.signature}
              />
            </div>
          </BackdropContainer>
        </Backdrop>
      )}
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
                  <MdSearch size={20} />
                </button>
              </Form>
            </StyledInput>
          </SearchBox>
          <Button type="button" onClick={handleNewDelivery}>
            <MdAdd size={24} /> Cadastrar
          </Button>
        </Action>
        <Table headers={headers} rows={deliveries} actions={actions} />
      </Container>
    </>
  );
}

Delivery.propTypes = {
  history: PropTypes.object.isRequired,
};
