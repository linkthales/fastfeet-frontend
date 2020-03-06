import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, CustomLink } from './styles';

export default function Header({ location: { pathname } }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <CustomLink
            path={{ highlight: pathname.split('/')[1] === 'delivery' }}
            to="/delivery"
          >
            ENCOMENDAS
          </CustomLink>
          <CustomLink
            path={{ highlight: pathname.split('/')[1] === 'deliveryman' }}
            to="/deliveryman"
          >
            ENTREGADORES
          </CustomLink>
          <CustomLink
            path={{ highlight: pathname.split('/')[1] === 'recipient' }}
            to="/recipient"
          >
            DESTINATÁRIOS
          </CustomLink>
          <CustomLink
            path={{ highlight: pathname.split('/')[1] === 'problem' }}
            to="/problem"
          >
            PROBLEMAS
          </CustomLink>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button
                type="button"
                onClick={() => {
                  handleSignOut();
                }}
              >
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
};
