import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../../../elements/buttons';
import { InputStyled } from '../../../../elements/input';
import PhoneInput from '../../../../elements/phone-input';
import { connect } from 'react-redux';
import * as t from '../../../../../redux/actionTypes';
import { Dropdown } from '../../../../elements/dropdown';
import { setUserToLocalStorage } from '../../../../../utils/utils';

const CalculateFormStyled = styled.div`
   width: 100%;
   display: grid;
   /* grid-template-rows: min-content min-content; */
   align-items: center;
   .necessary_field{
      font-size: 13px;
      font-weight: 400;
      color: ${({theme}) => theme.textGrey};
      margin-left: 30px;
   }
   .calculate_form_wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 280px;
      column-gap: 20px;
      padding-left: 20px;
      margin-bottom: 20px;
      .calculate_form_column {
         display: grid;
         align-items: flex-end;
         grid-template-rows: repeat(3, 1fr);
         .input_label {
            display: inline-block;
            margin-bottom: 5px;
            margin-left: 15px;
            font-size: 14px;
            font-weight: 400;
            color: ${({theme}) => theme.textGrey};
         }
      }
   }
`;

const CalculateForm = ({
   dispatch,
   customerName,
   customerOrganization,
   customerPhone,
   customerPaymentMethod,
   customerAddress,
   materialWeight,
   materialVolume,
}) => {
   function checkButtonIfDisable() {
      if (
         !customerName ||
         customerPhone.length !== 19 ||
         !customerPaymentMethod ||
         !customerAddress ||
         !materialWeight ||
         !materialVolume
      ) {
         return true;
      }
      return false;
   }
   const paymentMethodList = [
      { title: 'Наличный расчет', id: 0 },
      { title: 'Безналичный расчет', id: 1 },
   ];

   function handleCalculateClick() {
      setUserToLocalStorage(customerName, customerPhone)

      dispatch({ type: t.SET_CURRENT_COMPONENT, payload: t.RESULT_PAGE })
   }

   return (
      <CalculateFormStyled>
         <div>
            <div className="calculate_form_wrapper">
               <div className="calculate_form_column">
                  <div>
                     <span className="input_label">* Ваше имя</span>
                     <InputStyled
                        border
                        placeholder="Петро"
                        value={customerName || ''}
                        onChange={e => dispatch({ type: t.SET_CUSTOMER_NAME, payload: e.target.value })}
                     />
                  </div>
                  <div>
                     <span className="input_label">Название организации</span>
                     <InputStyled
                        border
                        placeholder="ТОВ"
                        value={customerOrganization || ''}
                        onChange={e => dispatch({ type: t.SET_CUSTOMER_ORGANIZATION, payload: e.target.value })}
                     />
                  </div>
                  <div>
                     <span className="input_label">* Номер телефона</span>
                     <PhoneInput
                        value={customerPhone || ''}
                        onChange={value => dispatch({ type: t.SET_CUSTOMER_PHONE, payload: value })}
                     />
                  </div>
               </div>
               <div className="calculate_form_column">
                  <div>
                     <span className="input_label">* Форма оплаты</span>
                     <Dropdown
                        selectedItem={customerPaymentMethod}
                        callback={(title, id) => dispatch({ type: t.SET_CUSTOMER_PAYMENT_METHOD, payload: title })}
                        withBorder={true}
                        list={paymentMethodList}
                     />
                  </div>
                  <div>
                     <span className="input_label">* Адрес</span>
                     <InputStyled
                        border
                        placeholder="г. Киев, ул. Олеся Гончара,2"
                        value={customerAddress || ''}
                        onChange={e => dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: e.target.value })}
                     />
                  </div>
                  <PrimaryButton
                     // primaryDisable={checkButtonIfDisable()}
                     onClick={handleCalculateClick}>
                     Рассчитать
                  </PrimaryButton>
               </div>
            </div>
            <span className='necessary_field'>* - Обязательное к заполнению поле</span>
         </div>
      </CalculateFormStyled>
   );
};

const mapStateToProps = ({ firstPage }) => ({
   materialWeight: firstPage.materialWeight,
   materialVolume: firstPage.materialVolume,
   
});

export default connect(mapStateToProps)(CalculateForm);
