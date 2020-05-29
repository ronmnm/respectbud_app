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
import { getPrice } from '../../../services/get-price';
// import { createBrowserHistory } from 'history';
import { NavLink, Router, withRouter } from 'react-router-dom';
import ResultPage from '../../desktop/main-content/result-section/result-page';
import { history } from '../mobile';

// const history = createBrowserHistory();

const PaymentStyled = styled(AnketaPageStyled)`
  .content_wrapper{
    align-self: flex-start;
    margin-top: 20px;
  }
`;

function PaymentMethodPage({
  dispatch,
  paymentMethodList,
  paymentMethod,
  addr,
  materialTypeTitle,
  weight,
  paymentA,
  coords,
  phone,
}) {
  const [loading, setLoading] = useState(0);

  const makeCalculations = async () => {
    setLoading(1);
    const time = new Date().toLocaleString();
    const result = await getPrice(addr, materialTypeTitle, weight, paymentA, coords, phone, time);
    console.log(result);
    dispatch({ type: t.SET_FINAL_PRICE, payload: result });
    setLoading(0);
    history.push('/result');
  };

  return (
    <Router history={history}>
      <PaymentStyled>
        <MobileHeader title="Форма оплаты" withButton navLinkTo="map" />
        <div className='content_wrapper'>
          <div className="input_field_wrapper">
            <LabelStyled>* Выберите форму оплаты</LabelStyled>
            <Dropdown
              withBorder={true}
              list={paymentMethodList}
              callback={(title, id, alias) => dispatch({ type: t.SET_CUSTOMER_PAYMENT_METHOD, payload: title, alias })}
              selectedItem={paymentMethod}
            />
          </div>
        </div>
        {/* <GreyButton
        onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.MAP_PAGE })}
        style={{ marginBottom: '20px' }}>
        Назад
      </GreyButton> */}

        {/* <NavLink to="/result"> */}
        <PrimaryButton primaryDisable={!paymentMethod} loading={loading} onClick={makeCalculations}>
          Рассчитать стоимость
        </PrimaryButton>
        {/* </NavLink> */}
      </PaymentStyled>
    </Router>
  );
}

const mapStateToProps = ({ globalData, firstPage }) => ({
  paymentMethodList: globalData.paymentMethodList,
  paymentMethod: firstPage.customerPaymentMethod,
  addr: firstPage.customerAddress,
  materialTypeTitle: firstPage.materialTypeTitle,
  weight: firstPage.materialWeight,
  paymentA: firstPage.paymentMethodAlias,
  coords: globalData.selectedCoordinates,
  phone: firstPage.customerPhone,
});

export default connect(mapStateToProps)(PaymentMethodPage);
