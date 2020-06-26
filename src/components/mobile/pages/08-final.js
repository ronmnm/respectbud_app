import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import * as t from '../../../redux/actionTypes';
import MobileHeader from './header/header';
import { AnketaPageStyled } from './01-anketa';
import { NavLink } from 'react-router-dom';
import { history } from '../mobile';

const FinalStyled = styled(AnketaPageStyled)`
  h3 {
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 50px;
  }
  p {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.textGrey};
  }
`;

function FinalPage({ dispatch }) {
  return (
    <FinalStyled>
      <MobileHeader title="" />
      <div>
        <h3>Благодарим за заказ!</h3>
        <p>
          Наш менеджер свяжется с вами
          <br /> в течении 10 минут.
        </p>
      </div>
      <NavLink to="/">
        <PrimaryButton onClick={() => history.push('/')}>
          На главную
        </PrimaryButton>
      </NavLink>
    </FinalStyled>
  );
}
export default connect()(FinalPage);
