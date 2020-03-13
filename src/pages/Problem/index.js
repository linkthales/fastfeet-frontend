import React, { useState, useRef, useEffect } from 'react';
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

const headers = [
  { key: 'id', name: 'Encomenda' },
  { key: 'product', name: 'Produto' },
  { key: 'last_problem.description', type: 'problem', name: 'Problema' },
];

export default function Problem() {
  const formRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [searchContext, setSearchContext] = useState('');
  const [currentDeliveryProblem, setCurrentDeliveryProblem] = useState({});
  const [openModal, setOpenModal] = useState(false);

  async function getDeliveryProblems(search) {
    const response = await api.get(
      `/manage-deliveries?q=${search}&page=${currentPage}&onlyWithProblem=true`
    );

    const { pages, deliveries } = response.data;

    setPages(pages);
    setDeliveryProblems(deliveries);
  }

  async function deleteDeliveryProblem(deliveryProblemId) {
    if (
      window.confirm(
        `Tem certeza que deseja cancelar a encomenda de id ${deliveryProblemId}?`
      )
    ) {
      await api.delete(`/manage-deliverymans/${deliveryProblemId}`);

      getDeliveryProblems(searchContext);
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
        deleteDeliveryProblem(deliveryProblemId);
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
