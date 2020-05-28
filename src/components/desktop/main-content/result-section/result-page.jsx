import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as t from '../../../../redux/actionTypes';
import { PrimaryButton, GreyButton } from '../../../elements/buttons';

const ResultStyled = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
  margin: auto;
  padding: 0 50px 120px 50px;
  h1 {
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }
  h3 {
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    span {
      font-weight: 500;
    }
  }
  .buttons_wrap {
    display: grid;
    grid-template-columns: minmax(150px, 240px) minmax(150px, 240px);
    column-gap: 20px;
  }
`;

const ResultPage = ({ dispatch, finalPrice }) => {
  const handleBack = () => {
    dispatch({ type: t.SET_CURRENT_COMPONENT, payload: t.MAIN_FORM });
  };
  const handleProceedToOrder = () => {
    dispatch({ type: t.SET_CURRENT_COMPONENT, payload: t.ORDER_PAGE });
  };
  return (
    <ResultStyled>
      <h1>Результат</h1>
      <h3>
        Цена с доставкой составляет: <span>{finalPrice} грн</span>{' '}
      </h3>
      <div className="buttons_wrap">
        <div>
          <GreyButton onClick={handleBack}>Рассчитать заново</GreyButton>
        </div>
        <div>
          <PrimaryButton onClick={handleProceedToOrder}>Заказать</PrimaryButton>
        </div>
      </div>
    </ResultStyled>
  );
};

const mapStateToProps = ({ globalData }) => ({
  finalPrice: globalData.finalPrice,
});

export default connect(mapStateToProps)(ResultPage);
