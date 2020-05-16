import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../../../elements/buttons';
import { InputStyled } from '../../../../elements/input';
import PhoneInput from './phone-input';
import { connect } from 'react-redux';
import * as t from '../../../../../redux/actionTypes';
import { Dropdown } from '../../../../elements/dropdown';

const CalculateFormStyled = styled.div`
   width: 100%;
   display: grid;
   align-items: center;
   .calculate_form_wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 260px;
      column-gap: 20px;
      padding-left: 20px;
      .calculate_form_column {
         display: grid;
         align-items: flex-end;
         grid-template-rows: repeat(3, 1fr);
         .input_label {
            display: inline-block;
            margin-bottom: 5px;
            margin-left: 15px;
            font-size: 14px;
         }
      }
   }
`;

const CalculateForm = ({ dispatch }) => {
   return (
      <CalculateFormStyled>
         <div className="calculate_form_wrapper">
            <div className="calculate_form_column">
               <div>
                  <span className="input_label">Ваше имя</span>
                  <InputStyled border placeholder="Петро" />
               </div>
               <div>
                  <span className="input_label">Название организации</span>
                  <InputStyled border placeholder="ТОВ" />
               </div>
               <div>
                  <span className="input_label">Номер телефона</span>
                  <PhoneInput />
               </div>
            </div>
            <div className="calculate_form_column">
               <div>
                  <span className="input_label">Форма оплаты</span>
                  <Dropdown
                     list={[
                        { title: 'Наличный расчет ', id: 0 },
                        { title: 'Безналичный расчет ', id: 1 },
                     ]}
                  />
               </div>
               <div>
                  <span className="input_label">Адрес</span>
                  <InputStyled border placeholder="г. Киев, ул. Олеся Гончара,2" />
               </div>
               <PrimaryButton onClick={() => dispatch({ type: t.SET_CURRENT_COMPONENT, payload: t.RESULT_PAGE })}>
                  Рассчитать
               </PrimaryButton>
            </div>
         </div>
      </CalculateFormStyled>
   );
};

// const mapDispatchToProps = di

export default connect(null, null)(CalculateForm);
