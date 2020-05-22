import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';
import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { Dropdown } from '../../elements/dropdown';
import { connect } from 'react-redux';
import { LabelStyled } from './01-anketa';
import { InputStyled } from '../../elements/input';
import * as t from '../../../redux/actionTypes';
import { Svg7 } from '../../../static/7';

const PaymentStyled = styled(AnketaPageStyled)``;

function PaymentMethodPage({ dispatch, paymentMethodList, customerPaymentMethod }) {
   const [loading, setLoading] = useState(0);

   let timer;
   const makeCalculations = () => {
      setLoading(1);
      timer = setTimeout(() => {
         dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.RESULT_MOBILE_PAGE });
         setLoading(0);
         // clearTimeout(timer)
      }, 1000);
   };
   useEffect(() => {
      console.log(timer, 'clear');
      return () => clearTimeout(timer);
   }, []);

   return (
      <PaymentStyled>
         <MobileHeader title="Форма оплаты" />
         <div>
            <div className="input_field_wrapper">
               <LabelStyled>* Выберите форму оплаты</LabelStyled>
               <Dropdown
                  withBorder={true}
                  list={paymentMethodList}
                  callback={(title, id) => dispatch({ type: t.SET_CUSTOMER_PAYMENT_METHOD, payload: title })}
                  selectedItem={customerPaymentMethod}
               />
            </div>
         </div>
         <GreyButton
            onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.MAP_PAGE })}
            style={{ marginBottom: '20px' }}>
            Назад
         </GreyButton>

         <PrimaryButton loading={loading} onClick={makeCalculations}>
            Далее
         </PrimaryButton>
      </PaymentStyled>
   );
}

const mapStateToProps = ({ globalData, firstPage }) => ({
   paymentMethodList: globalData.paymentMethodList,
   customerPaymentMethod: firstPage.customerPaymentMethod,
});

export default connect(mapStateToProps)(PaymentMethodPage);
