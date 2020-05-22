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

function ResultPage({ dispatch, paymentMethodList }) {
   return (
      <ResultStyled>
         <MobileHeader title="Результат" />
         <div>
            <p className="additional_text">Цена с доставкой составляет:</p>
            <div className="input_field_wrapper">
               <h1 className="text_centered">45600 грн</h1>
            </div>
         </div>
         <PrimaryButton
            onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.ORDER_MOBILE_PAGE })}>
            Заказать
         </PrimaryButton>
         <GreyButton
            onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.VYBOR_TOVARA_PAGE })}
            style={{ marginTop: '20px' }}>
            Рассчитать заново
         </GreyButton>
      </ResultStyled>
   );
}

const mapStateToProps = ({ globalData, firstPage }) => ({
   paymentMethodList: globalData.paymentMethodList,
});

export default connect(mapStateToProps)(ResultPage);
