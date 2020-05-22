import React from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';
import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import { LabelStyled } from './01-anketa';
import { InputStyled } from '../../elements/input';
import * as t from '../../../redux/actionTypes';

const MapStyled = styled(AnketaPageStyled)`
   .map_wrapper {
      height: 30vh;
      background-color: #eee;
   }
`;

function MapPage({ dispatch, customerAddress }) {
   function handleNextClick() {
      dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.MAP_PAGE });
   }

   return (
      <MapStyled>
         <MobileHeader title="Адрес доставки" />
         <div>
            <div className="input_field_wrapper">
               <InputStyled
                  value={customerAddress || ''}
                  onChange={e => dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: e.target.value })}
                  placeholder="Введите адрес"
                  border
               />
            </div>
            <div className="map_wrapper">
               <span>map</span>
            </div>
         </div>

         <div>
            <GreyButton
               onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.CALCULATOR_PAGE })}
               style={{ marginBottom: '20px' }}>
               Назад
            </GreyButton>
            <PrimaryButton
               onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.PAYMENT_METHOD_PAGE })}>
               Далее
            </PrimaryButton>
         </div>
      </MapStyled>
   );
}

const mapStateToProps = ({ firstPage }) => ({
   customerAddress: firstPage.customerAddress,
});
export default connect(mapStateToProps)(MapPage);
