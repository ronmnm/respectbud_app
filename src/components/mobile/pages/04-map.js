import React from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';
import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import { LabelStyled } from './01-anketa';
import { InputStyled } from '../../elements/input';
import * as t from '../../../redux/actionTypes';
import MapComponent from '../../desktop/main-content/01_calculate/white-section/map';
import { NavLink } from 'react-router-dom';
import InputPlaces from '../../desktop/main-content/01_calculate/white-section/places-input';

const MapStyled = styled(AnketaPageStyled)`
  .content_wrapper {
    align-self: flex-start;
    height: 100%;
    .map_wrapper {
      height: 100%;
      margin: 0;
      /* padding-bottom: 44px; */
      /* position: absolute; */
      width: 100%;
      padding-bottom: 44px;
      margin: 0;
    }
  }
`;

function MapPage({ dispatch, customerAddress, selectedCoordinates }) {
  return (
    <MapStyled>
      <MobileHeader title="Адрес доставки" withButton navLinkTo="calculations" />
      <div className="content_wrapper">
        <div className="input_field_wrapper">
          <InputPlaces address={customerAddress} dispatch={dispatch} />
          {/* <InputStyled
            value={customerAddress || ''}
            onChange={e => dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: e.target.value })}
            placeholder="Введите адрес"
            border
          /> */}
        </div>
        <div className="map_wrapper">
          <MapComponent style={{ height: '100%' }} />
        </div>
      </div>

      <div>
        {/* <GreyButton
          onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.CALCULATOR_PAGE })}
          style={{ marginBottom: '20px' }}>
          Назад
        </GreyButton> */}
        <NavLink to="/payment-method">
          <PrimaryButton
            primaryDisable={!selectedCoordinates}
            onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.PAYMENT_METHOD_PAGE })}>
            Далее
          </PrimaryButton>
        </NavLink>
      </div>
    </MapStyled>
  );
}

const mapStateToProps = ({ firstPage, globalData }) => ({
  customerAddress: firstPage.customerAddress,
  selectedCoordinates: globalData.selectedCoordinates,
});
export default connect(mapStateToProps)(MapPage);
