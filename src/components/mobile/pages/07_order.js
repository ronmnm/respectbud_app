import React, { useState } from 'react';
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
import { history } from '../mobile';
import PlaceOrder from '../../../services/placeOrder';

registerLocale('ru', ru);

const DatePickerStyled = styled(DatePicker)`
  ${inputStyles}
`;

const OrderStyled = styled(AnketaPageStyled)`
  .content_wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: min-content min-content 1fr;
    padding: 50px 0;
  }
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
    /* align-items: flex-end; */
    /* margin-bottom: 20px; */
    .text_area {
      outline: none;
      -moz-appearance: none;
      border: 1px solid ${({ theme }) => theme.darkGrey};
      resize: none;
      height: 100%;
      padding: 13px 13px 0 13px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      width: 100%;
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

function OrderPage({ dispatch, deliveryDate, phoneOnUnloading, orderComment, deliveryDateHuman, deliveryTime, time, phone }) {

  const [loading, setLoading] = useState(0)

  const makeOrderTap = async () => {
    setLoading(1)
    await PlaceOrder({deliveryDateHuman, deliveryTime, phoneOnUnloading, orderComment, time, phone})
    setLoading(0)
    history.push('/final-page');
  }

  return (
    <OrderStyled>
      <MobileHeader title="Оформление заказа" withButton navLinkTo="result" />
      <div className="content_wrapper">
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
        <PrimaryButton
          loading={loading}
          primaryDisable={!orderComment || phoneOnUnloading.length !== 19 || !deliveryDate}
          onClick={makeOrderTap}>
          Оформить заказ
        </PrimaryButton>
    </OrderStyled>
  );
}

const mapStateToProps = ({ globalData, firstPage, order }) => ({
  paymentMethodList: globalData.paymentMethodList,
  deliveryDate: order.deliveryDate,
  phoneOnUnloading: order.phoneOnUnloading,
  orderComment: order.orderComment,
  deliveryDateHuman: order.deliveryDateHuman,
  time: globalData.time,
  phone: firstPage.customerPhone,
});

export default connect(mapStateToProps)(OrderPage);
