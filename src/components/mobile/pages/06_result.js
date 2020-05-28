import React from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';
import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { Dropdown } from '../../elements/dropdown';
import { connect } from 'react-redux';
import { LabelStyled } from './01-anketa';
import { InputStyled } from '../../elements/input';
import * as t from '../../../redux/actionTypes';
import { Router, NavLink } from 'react-router-dom';


const ResultStyled = styled(AnketaPageStyled)`
  .additional_text {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textGrey};
    font-weight: 300;
    text-align: center;
    margin-bottom: 35px;
  }
  .text_centered {
    margin: 30px 0;
    text-align: center;
    font-size: 2.3rem;
    font-weight: 500;
  }
`;

function ResultPage({ dispatch, finalPrice, paymentMethodList }) {
  return (
    <ResultStyled>
      <MobileHeader title="Результат" />
      <div>
        <p className="additional_text">Цена с доставкой составляет:</p>
        <div className="input_field_wrapper">
          <h1 className="text_centered">{finalPrice} грн</h1>
        </div>
      </div>
      <NavLink to="/material">
        <GreyButton onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.VYBOR_TOVARA_PAGE })}>
          Рассчитать заново
        </GreyButton>
      </NavLink>
      <NavLink to="/order">
        <PrimaryButton
          style={{ marginTop: '20px' }}
          onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.ORDER_MOBILE_PAGE })}>
          Заказать
        </PrimaryButton>
      </NavLink>
    </ResultStyled>
  );
}

const mapStateToProps = ({ globalData, firstPage }) => ({
  paymentMethodList: globalData.paymentMethodList,
  finalPrice: globalData.finalPrice,
});

export default connect(mapStateToProps)(ResultPage);
