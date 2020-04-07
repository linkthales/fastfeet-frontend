import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import api from '~/services/api';

import Input from '~/components/Input';
import AsyncSelect from '~/components/AsyncSelect';

import {
  Container,
  Header,
  ActionButtons,
  FormContainer,
  Row,
  SelectBlock,
} from './styles';

export default function ManageDelivery({
  history,
  match: {
    params: { id },
  },
}) {
  const formRef = useRef(null);
  const [delivery, setDelivery] = useState({
    recipient_id: '',
    deliveryman_id: '',
    product: '',
  });
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        recipient_id: Yup.number().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.number().required('O entregador é obrigatório'),
        product: Yup.string().required('O nome do produto é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (id === '0') {
        await api.post('/manage-deliveries', data);
      } else {
        await api.put(`/manage-deliveries/${id}`, data);
      }

      return history.push('/delivery');
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        return formRef.current.setErrors(validationErrors);
      }

      const errorObject = JSON.parse(err.request.response);

      return toast.error(errorObject.error);
    }
  }

  async function getDeliverymans(search = '') {
    const response = await api.get(
      `/manage-deliverymans?q=${search}&getAll=true`
    );

    const { deliverymans: newDeliverymans } = response.data;

    return newDeliverymans.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));
  }

  async function getRecipients(search = '') {
    const response = await api.get(
      `/manage-recipients?q=${search}&getAll=true`
    );

    const { recipients: newRecipients } = response.data;

    return newRecipients.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/manage-deliveries?id=${id}`);

      const { deliveries } = response.data;

      setDeliverymans(await getDeliverymans());
      setRecipients(await getRecipients());
      setDelivery(deliveries[0]);
    }

    getData();
  }, [id]);

  return (
    <Container>
      <Form ref={formRef} initialData={delivery} onSubmit={handleSubmit}>
        <Header>
          <h1>
            {id === '0' ? 'Cadastro de encomendas' : 'Edição de encomendas'}
          </h1>
          <ActionButtons>
            <button
              type="button"
              onClick={() => {
                history.push('/delivery');
              }}
            >
              <MdKeyboardArrowLeft size={24} />
              Voltar
            </button>
            <button type="submit">
              <MdCheck size={20} />
              Salvar
            </button>
          </ActionButtons>
        </Header>

        <FormContainer>
          <Row>
            <SelectBlock>
              <span>Destinatário</span>
              <AsyncSelect
                name="recipient_id"
                placeholder="Ludwig van Beethoven"
                options={recipients}
                loadOptions={async (value, fn) => {
                  const filteredRecipients = await getRecipients(value);
                  fn(filteredRecipients);
                }}
              />
            </SelectBlock>
            <SelectBlock>
              <span>Entregador</span>
              <AsyncSelect
                name="deliveryman_id"
                placeholder="John Doe"
                options={deliverymans}
                loadOptions={async (value, fn) => {
                  const filteredDeliverymans = await getDeliverymans(value);
                  fn(filteredDeliverymans);
                }}
              />
            </SelectBlock>
          </Row>
          <span>Nome do produto</span>
          <Input name="product" placeholder="Yamaha SX7" />
        </FormContainer>
      </Form>
    </Container>
  );
}

ManageDelivery.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
