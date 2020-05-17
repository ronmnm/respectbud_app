import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as t from '../../../../redux/actionTypes';
import { PrimaryButton } from '../../../elements/buttons';
import { InputStyled } from '../../../elements/input';
import Modal from '../../../elements/modal';
import { useOutsideAlerter } from '../../../../hooks/outsideAlerter';

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
         .text_area_wrapper {
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
               &::placeholder {
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

const ModalContentStyled = styled.div`
   display: grid;
   grid-template-rows: min-content 3fr 1fr;
   height: 100%;
   .modal_top {
      display: grid;
      padding: 20px;
      .close_cross {
         justify-self: flex-end;
         svg {
            stroke: ${({ theme }) => theme.black};
         }
         &:hover {
            cursor: pointer;
         }
      }
   }
   .modal_content {
      display: grid;
      align-items: center;
      h1,
      p {
         text-align: center;
         color: ${({ theme }) => theme.black};
      }
      h1 {
         font-size: 24px;
         font-weight: 400;
         margin-bottom: 80px;
      }
      p {
         font-size: 18px;
         line-height: 30px;
         font-weight: 300;
      }
   }
   .modal_button{
      padding: 50px;
   }
`;


const OrderPage = ({ backToMain }) => {
   const { visible, setVisible, ref } = useOutsideAlerter(false);
   
   function makeOrderClick(){
      setVisible(true)
   }
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
               <div className="text_area_wrapper">
                  <span className="input_label">Добавить коментарий</span>
                  <textarea placeholder="вези быстрее!" className="text_area"></textarea>
               </div>
               <div>
                  <PrimaryButton onClick={makeOrderClick}>Оформить заказ</PrimaryButton>
               </div>
            </div>
         </div>
         <Modal isModalOpen={visible}>
            <ModalContentStyled ref={ref}>
               <div className="modal_top">
                  <div className="close_cross" onClick={() => setVisible(false)}>
                     <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.646447" y1="24.6882" x2="24.6881" y2="0.646564" />
                        <line x1="1.35355" y1="0.646447" x2="25.3952" y2="24.6881" />
                     </svg>
                  </div>
               </div>
               <div className="modal_content">
                  <div>
                     <h1>Благодарим за заказ!</h1>
                     <p>Наш менеджер свяжется с вами<br />в течении 10 минут.</p>
                  </div>
               </div>
               <div className="modal_button">
                  <PrimaryButton onClick={backToMain}>Вернуться на главную</PrimaryButton>
               </div>
            </ModalContentStyled>
         </Modal>
      </OrderPageStyled>
   );
};

const mapDispatchToProps = dispatch => ({
   backToMain: () => dispatch({ type: t.SET_CURRENT_COMPONENT, payload: t.MAIN_FORM }),
});
export default connect(null, mapDispatchToProps)(OrderPage);
