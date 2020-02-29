import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, CustomLink } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const lulu = 'true';

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <CustomLink path={lulu} to="/Delivery">
            ENCOMENDAS
          </CustomLink>
          <CustomLink to="/lulu">ENTREGADORES</CustomLink>
          <CustomLink to="/Delivery">DESTINATÁRIOS</CustomLink>
          <CustomLink to="/Delivery">PROBLEMAS</CustomLink>
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
