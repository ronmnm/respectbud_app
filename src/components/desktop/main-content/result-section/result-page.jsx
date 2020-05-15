import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import * as t from '../../../../redux/actionTypes';
import { PrimaryButton, GreyButton } from '../../../elements/buttons';

const ResultStyled = styled.div`
   display: grid;
   justify-content: center;
   align-items: center;
   /* width: 600px; */
   height: 300px;
   /* background-color: lightseagreen; */
   padding-bottom: 100px;
   margin: auto;
   h1{
      font-size: 32px;
      font-weight: 500;
      text-align: center;
   }
   h3{
      font-size: 24px;
      font-weight: 300;
      text-align: center;
      span{
         font-weight: 500;
      }
   }
   .buttons_wrap{
      display: grid;
      grid-template-columns: minmax(150px, 240px) minmax(150px, 240px);
      column-gap: 20px;
   }
`;

const ResultPage = ({ dispatch }) => {
   const handleBack = e => {
      e.preventDefault();
      dispatch({type: t.SET_CURRENT_COMPONENT, payload: t.MAIN_FORM})
   };
   return (
      <ResultStyled>
         <h1>Результат</h1>
         <h3>Цена с доставкой составляет: <span>12345 грн</span> </h3>
         <div className="buttons_wrap">
            <div><PrimaryButton>Заказать</PrimaryButton></div>
            <div onClick={handleBack}><GreyButton>Рассчитать заново</GreyButton></div>
         </div>
      </ResultStyled>
   );
};

export default connect()(ResultPage);
