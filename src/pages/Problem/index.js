import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  MdClose,
  MdSearch,
  MdRemoveRedEye,
  MdDeleteForever,
} from 'react-icons/md';
import { Form } from '@unform/web';

import api from '~/services/api';

import Table from '~/components/Table';
import Input from '~/components/Input';

import {
  BackdropContainer,
  Container,
  Title,
  Action,
  SearchBox,
  StyledInput,
} from './styles';
import { blueColor, dangerColor } from '~/styles/colors';
import Backdrop from '../_layouts/backdrop';
import Pager from '~/components/Pager';
import Confirmation from '~/components/Confirmation';

const headers = [
  { key: 'id', name: 'Encomenda' },
  { key: 'product', name: 'Produto' },
  { key: 'last_problem.description', type: 'problem', name: 'Problema' },
  { key: 'status', name: 'Status' },
];

export default function Problem() {
  const formRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [searchContext, setSearchContext] = useState('');
  const [currentDeliveryProblem, setCurrentDeliveryProblem] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  async function getDeliveryProblems(search) {
    const response = await api.get(
      `/manage-deliveries?q=${search}&page=${currentPage}&onlyWithProblem=true`
    );

    const { pages: maxPages, deliveries } = response.data;

    setPages(maxPages);
    setDeliveryProblems(deliveries);
  }

  async function deleteDeliveryProblem(deliveryProblem) {
    try {
      await api.delete(
        `/manage-deliveries/${deliveryProblem.problems[0].id}/cancel-delivery`
      );

      getDeliveryProblems(searchContext);
      setOpenConfirmation(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    getDeliveryProblems(searchContext);
  }, [searchContext]);

  useEffect(() => {
    getDeliveryProblems(searchContext);
  }, [currentPage]);

  function handleSubmit({ search }) {
    setSearchContext(search);
  }

  const actions = [
    {
      content: 'Visualizar',
      icon: MdRemoveRedEye,
      color: blueColor,
      execute: deliveryProblemId => {
        const deliveryProblem = deliveryProblems.find(iDelivery => {
          return iDelivery.id === deliveryProblemId;
        });

        setCurrentDeliveryProblem(deliveryProblem);
        setOpenModal(true);
      },
    },
    {
      content: 'Cancelar encomenda',
      icon: MdDeleteForever,
      color: dangerColor,
      execute: deliveryProblemId => {
        const deliveryProblem = deliveryProblems.find(iDelivery => {
          return iDelivery.id === deliveryProblemId;
        });

        setCurrentDeliveryProblem(deliveryProblem);
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
            title="Cancelar encomenda"
            message={`Deseja realmente cancelar a encomenda ${currentDeliveryProblem.product} de id = ${currentDeliveryProblem.id}?`}
            confirmAction={() => setOpenConfirmation(false)}
            cancelAction={() => deleteDeliveryProblem(currentDeliveryProblem)}
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
            <h3>Problemas na entrega</h3>
            {currentDeliveryProblem.problems.map((problem, index) => (
              <p key={problem.id}>
                {index + 1} - {problem.description}
              </p>
            ))}
          </BackdropContainer>
        </Backdrop>
      )}
      <Container>
        <div>
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
                    <MdSearch size={20} />
                  </button>
                </Form>
              </StyledInput>
            </SearchBox>
          </Action>
          <Table headers={headers} rows={deliveryProblems} actions={actions} />
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
