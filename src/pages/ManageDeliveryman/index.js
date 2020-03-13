import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import api from '~/services/api';

import AvatarInput from './AvatarInput';
import Input from '~/components/Input';

import { Container, Header, ActionButtons, FormContainer } from './styles';

export default function ManageDeliveryman({
  history,
  match: {
    params: { id },
  },
}) {
  const formRef = useRef(null);
  const [deliveryman, setDeliveryman] = useState({
    name: '',
    email: '',
    avatar: null,
  });

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (id === '0') {
        await api.post('/manage-deliverymans', data);
      } else {
        await api.put(`/manage-deliverymans/${id}`, data);
      }

      return history.push('/deliveryman');
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
    async function getDeliveryman() {
      const response = await api.get(`/manage-deliverymans?id=${id}`);

      setDeliveryman(response.data[0]);
    }

    getDeliveryman();
  }, [id]);

  return (
    <Container>
      <Form ref={formRef} initialData={deliveryman} onSubmit={handleSubmit}>
        <Header>
          <h1>
            {id === '0' ? 'Cadastro de entregadores' : 'Edição de entregadores'}
          </h1>
          <ActionButtons>
            <button
              type="button"
              onClick={() => {
                history.push('/deliveryman');
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
          <AvatarInput name="avatar_id" />

          <span>Nome</span>
          <Input name="name" placeholder="John Doe" />
          <span>Email</span>
          <Input name="email" type="email" placeholder="example@fastfeet.com" />
        </FormContainer>
      </Form>
    </Container>
  );
}

ManageDeliveryman.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
