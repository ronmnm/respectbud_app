import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as t from '../../../../redux/actionTypes';
import { PrimaryButton } from '../../../elements/buttons';
import { InputStyled } from '../../../elements/input';

const OrderPageStyled = styled.div`
   /* background-color: lightskyblue; */
   /* height: 300px; */
   max-width: 700px;
   margin: auto;
   display: grid;
   /* padding-bottom: 70px; */
   padding: 0 50px 100px 50px;
   h1 {
      text-align: center;
      font-size: 32px;
      font-weight: 400;
      margin-bottom: 10vh;
   }
   .order_form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 40px;
      height: 265px;
      .order_column {
         display: grid;
         grid-template-rows: repeat(3, 1fr);
         align-items: flex-end;
         row-gap: 5px;
         .text_area_wrapper{
            height: 100%;
            display: grid;
            grid-template-rows: 37px 1fr;
            grid-row-start: 1;
            grid-row-end: 3;
            align-items: flex-end;
            .text_area {
               outline: none;
               -moz-appearance: none;
               border: 1px solid ${({ theme }) => theme.darkGrey};
               resize: none;
               height: 100%;
               padding: 13px;
               margin-top: 10px;
               -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
               -moz-box-sizing: border-box; /* Firefox, other Gecko */
               box-sizing: border-box;
               font-size: 16px;
               font-family: 'Roboto', sans-serif;
               &::placeholder{
                  color: ${({ theme }) => theme.textGrey};
               }
               &:focus {
                  transition: 0.2s;
                  border: 1px solid ${({ theme }) => theme.black};
                  &::placeholder {
                     opacity: 0;
                  }
               }
            }
         }
         div {
            
         }
         .input_label {
            display: inline-block;
            margin-bottom: 5px;
            margin-left: 15px;
            color: ${({ theme }) => theme.textGrey};
         }
      }
   }
`;
const OrderPage = ({ makeOrderClick }) => {
   return (
      <OrderPageStyled>
         <h1>Оформление заказа</h1>
         <div className="order_form">
            <div className="order_column">
               <div>
                  <span className="input_label">Дата доставки</span>
                  <InputStyled border placeholder="Дата доставки" />
               </div>
               <div>
                  <span className="input_label">Время доставки</span>
                  <InputStyled border placeholder="Время доставки" />
               </div>
               <div>
                  <span className="input_label">Телефон на выгрузке</span>
                  <InputStyled border placeholder="Телефон на выгрузке" />
               </div>
            </div>
            <div className="order_column">
               <div className='text_area_wrapper'>
                  <span className="input_label">Добавить коментарий</span>
                  <textarea placeholder="вези быстрее!" className="text_area"></textarea>
               </div>
               <div>
                  <PrimaryButton onClick={makeOrderClick}>Оформить заказ</PrimaryButton>
               </div>
            </div>
         </div>
      </OrderPageStyled>
   );
};

const mapDispatchToProps = dispatch => ({
   makeOrderClick: () => dispatch({ type: t.SET_CURRENT_COMPONENT, payload: t.RESULT_PAGE }),
});
export default connect(null, mapDispatchToProps)(OrderPage);
