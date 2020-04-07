import React, { useState, useRef, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  MdClose,
  MdAdd,
  MdSearch,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
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
import Pager from '~/components/Pager';
import Confirmation from '~/components/Confirmation';

const headers = [
  { key: 'id', name: 'ID' },
  { key: 'recipient.name', name: 'Destinatário' },
  { key: 'product', name: 'Produto' },
  { key: 'deliveryman.avatar.url', type: 'image', name: 'Foto' },
  { key: 'deliveryman.name', name: 'Entregador' },
  { key: 'recipient.city', name: 'Cidade' },
  { key: 'recipient.state', name: 'Estado' },
  { key: 'status', name: 'Status' },
];

export default function Delivery({ history }) {
  const formRef = useRef(null);
  const [deliveries, setDeliveries] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchContext, setSearchContext] = useState('');
  const [currentDelivery, setCurrentDelivery] = useState({});
  const [problemFlag, setProblemFlag] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  async function getDeliveries(search) {
    const response = await api.get(
      `/manage-deliveries?q=${search}&page=${currentPage}${
        problemFlag ? '&onlyWithProblem=true' : ''
      }`
    );

    const { pages: maxPages, deliveries: newDeliveries } = response.data;

    setPages(maxPages);
    setDeliveries(newDeliveries);
  }

  async function deleteDelivery(deliveryId) {
    try {
      await api.delete(`/manage-deliveries/${deliveryId}`);

      getDeliveries(searchContext);
      setOpenConfirmation(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    getDeliveries(searchContext);
  }, [searchContext, problemFlag]);

  useEffect(() => {
    getDeliveries(searchContext);
  }, [currentPage]);

  const dates = useMemo(() => {
    const startDate = currentDelivery.start_date
      ? format(new Date(currentDelivery.start_date), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '- - / - - / - - - -';
    const endDate = currentDelivery.end_date
      ? format(new Date(currentDelivery.end_date), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '- - / - - / - - - -';
    const cancelDate = currentDelivery.cancelled_at
      ? format(new Date(currentDelivery.cancelled_at), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '- - / - - / - - - -';

    return {
      startDate,
      endDate,
      cancelDate,
    };
  }, [currentDelivery]);

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
        const delivery = deliveries.find(iDelivery => {
          return iDelivery.id === deliveryId;
        });

        setCurrentDelivery(delivery);
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
            title="Excluir encomenda"
            message={`Deseja realmente excluir a encomenda ${currentDelivery.product} de id = ${currentDelivery.id}?`}
            confirmAction={() => setOpenConfirmation(false)}
            cancelAction={() => deleteDelivery(currentDelivery.id)}
          />
        </Backdrop>
      )}

      {openModal && (
        <Backdrop
          handleClose={() => {
            setOpenModal(false);
          }}
        >
          <BackdropContainer>
            <div>
              <h3>Informações da encomenda</h3>
              {currentDelivery.recipient && (
                <>
                  <p>
                    {currentDelivery.recipient.street},{' '}
                    {currentDelivery.recipient.street_number}
                  </p>
                  <p>
                    {currentDelivery.recipient.city} -{' '}
                    {currentDelivery.recipient.state}
                  </p>
                  <p>{currentDelivery.recipient.zip_code}</p>
                </>
              )}
            </div>

            <div>
              <h3>Datas</h3>
              <p>
                <strong>Retirada:</strong> {dates.startDate}
              </p>
              {currentDelivery.cancelled_at ? (
                <p>
                  <strong>Cancelada:</strong> {dates.cancelDate}
                </p>
              ) : (
                <p>
                  <strong>Entrega:</strong> {dates.endDate}
                </p>
              )}
            </div>

            <div>
              <h3>Assinatura do destinatário</h3>
              {currentDelivery.signature && (
                <img
                  src={currentDelivery.signature.url}
                  alt={currentDelivery.signature.name}
                />
              )}
            </div>
          </BackdropContainer>
        </Backdrop>
      )}
      <Container>
        <div>
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
              <label>
                <input
                  type="checkbox"
                  checked={problemFlag}
                  onChange={() => {
                    setProblemFlag(!problemFlag);
                  }}
                />
                <span>Apenas com problemas na entrega</span>
              </label>
            </SearchBox>
            <Button type="button" onClick={handleNewDelivery}>
              <MdAdd size={24} /> Cadastrar
            </Button>
          </Action>
          <Table headers={headers} rows={deliveries} actions={actions} />
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

Delivery.propTypes = {
  history: PropTypes.object.isRequired,
};
