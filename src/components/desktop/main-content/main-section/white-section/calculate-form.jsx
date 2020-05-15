import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../../../elements/buttons';
import { InputStyled } from '../../../../elements/input';

const CalculateFormStyled = styled.div`
   /* background-color: lightcyan; */
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
         input{
            width: 100%;
         }
      }
   }
`;

const CalculateForm = () => {
   return (
      <CalculateFormStyled>
         <div className="calculate_form_wrapper">
            <div className="calculate_form_column">
               <div>
                  <div>Ваше имя</div>
                  <InputStyled border placeholder='Петро' />
               </div>
               <div>
                  <div>Название организации</div>
                  <InputStyled border placeholder='ТОВ' />
               </div>
               <div>
                  <div>Номер телефона</div>
                  <InputStyled border placeholder='+38(0__)___-__-__' />
               </div>
            </div>
            <div className="calculate_form_column">
               <div>
                  <div>Форма оплаты</div>
                  <InputStyled border placeholder='Наличный расчет ' />
               </div>
               <div>
                  <div>Адрес</div>
                  <InputStyled border placeholder='г. Киев, ул. Олеся Гончара,2' />
               </div>
               <PrimaryButton  onClick={() => alert('hi')}>Рассчитать</PrimaryButton>
            </div>

            
            
         </div>
      </CalculateFormStyled>
   );
};
export default CalculateForm;
