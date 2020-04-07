import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import api from '~/services/api';

import Input from '~/components/Input';

import {
  Container,
  Header,
  ActionButtons,
  FormContainer,
  Row,
  LargeInput,
} from './styles';

export default function ManageDeliveries({
  history,
  match: {
    params: { id },
  },
}) {
  const formRef = useRef(null);
  const [recipient, setRecipient] = useState({
    name: '',
    street: '',
    street_number: '',
    complement: '',
    city: '',
    state: '',
    zip_code: '',
  });

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        street: Yup.string().required('O nome da rua é obrigatório'),
        street_number: Yup.number().required('O número da rua é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        state: Yup.string().required('O estado é obrigatório'),
        zip_code: Yup.string()
          .matches(/^\d{5}-\d{3}$/, 'O cep deve ter o formato 99999-999')
          .required('O CEP é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (id === '0') {
        await api.post('/manage-recipients', data);
      } else {
        await api.put(`/manage-recipients/${id}`, data);
      }

      return history.push('/recipient');
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

  useEffect(() => {
    async function getRecipient() {
      const response = await api.get(`/manage-recipients?id=${id}`);

      const { recipients } = response.data;

      setRecipient(recipients[0]);
    }

    getRecipient();
  }, [id]);

  return (
    <Container>
      <Form ref={formRef} initialData={recipient} onSubmit={handleSubmit}>
        <Header>
          <h1>
            {id === '0' ? 'Cadastro de destinatário' : 'Edição de destinatário'}
          </h1>
          <ActionButtons>
            <button
              type="button"
              onClick={() => {
                history.push('/recipient');
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
          <span>Nome</span>
          <Input name="name" placeholder="Ludwig van Beethoven" />
          <Row>
            <LargeInput>
              <span>Rua</span>
              <Input name="street" placeholder="Rua Beethoven" />
            </LargeInput>
            <div>
              <span>Número</span>
              <Input name="street_number" type="number" placeholder="1729" />
            </div>
            <div>
              <span>Complemento</span>
              <Input name="complement" />
            </div>
          </Row>
          <Row>
            <div>
              <span>Cidade</span>
              <Input name="city" placeholder="São Paulo" />
            </div>
            <div>
              <span>Estado</span>
              <Input name="state" placeholder="Diadema" />
            </div>
            <div>
              <span>CEP</span>
              <Input
                name="zip_code"
                placeholder="009960-580"
                mask="99999-999"
              />
            </div>
          </Row>
        </FormContainer>
      </Form>
    </Container>
  );
}

ManageDeliveries.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
