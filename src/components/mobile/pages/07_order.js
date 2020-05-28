import React from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';
import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import { LabelStyled } from './01-anketa';
import { InputStyled, inputStyles } from '../../elements/input';
import * as t from '../../../redux/actionTypes';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import PhoneInput from '../../elements/phone-input';
import { Svg7 } from '../../../static/7';
import { NavLink } from 'react-router-dom';

registerLocale('ru', ru);

const DatePickerStyled = styled(DatePicker)`
  ${inputStyles}
`;

const OrderStyled = styled(AnketaPageStyled)`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .calendar_logo {
    color: red;
    position: absolute;
    right: 16px;
    z-index: 2;
    top: 37px;
    pointer-events: none;
  }
  .text_area_wrapper {
    height: 100%;
    display: grid;
    align-items: flex-end;
    margin-bottom: 20px;
    .text_area {
      outline: none;
      -moz-appearance: none;
      border: 1px solid ${({ theme }) => theme.darkGrey};
      resize: none;
      height: 100%;
      padding: 13px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      &::placeholder {
        color: ${({ theme }) => theme.textLightGrey};
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
`;

function OrderPage({ dispatch, deliveryDate, phoneOnUnloading, orderComment }) {
  return (
    <OrderStyled>
      <MobileHeader title="Оформление заказа" />
      <div>
        <div className="input_field_wrapper">
          <LabelStyled>* Дата доставки</LabelStyled>
          <label htmlFor="eu" className="calendar_logo">
            <Svg7 calendarIcon />
          </label>
          <DatePickerStyled
            placeholderText="Выберете дату"
            withPortal
            fixedHeight
            onFocus={e => (e.target.readOnly = true)}
            selected={deliveryDate || ''}
            minDate={new Date()}
            locale="ru"
            dateFormat="dd-MM-yyyy"
            onChange={value => dispatch({ type: t.SET_DELIVERY_DATE, payload: value })}></DatePickerStyled>
        </div>
        <div className="input_field_wrapper">
          <LabelStyled>* Телефон на выгрузке</LabelStyled>
          <PhoneInput
            border
            onChange={value => dispatch({ type: t.SET_PHONE_ON_UNLOADING, payload: value })}
            value={phoneOnUnloading}
            placeholder="Телефон на выгрузке"
          />
        </div>
        <div className="text_area_wrapper">
          <LabelStyled>* Добавить коментарий</LabelStyled>
          <textarea
            placeholder="Комент"
            value={orderComment || ''}
            onChange={e => dispatch({ type: t.SET_ORDER_COMMENT, payload: e.target.value })}
            className="text_area"></textarea>
        </div>
      </div>
      <NavLink to="/final-page">
        <PrimaryButton
          // height="55px"
          onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.FINAL_PAGE })}>
          Оформить
        </PrimaryButton>
      </NavLink>
      {/* <GreyButton
            // height="55px"
            onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.RESULT_MOBILE_PAGE })}
            style={{ marginTop: '20px' }}>
            Рассчитать заново
         </GreyButton> */}
    </OrderStyled>
  );
}

const mapStateToProps = ({ globalData, firstPage, order }) => ({
  paymentMethodList: globalData.paymentMethodList,
  deliveryDate: order.deliveryDate,
  phoneOnUnloading: order.phoneOnUnloading,
  orderComment: order.orderComment,
});

export default connect(mapStateToProps)(OrderPage);
