import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as t from '../../../../redux/actionTypes';
import { PrimaryButton } from '../../../elements/buttons';
import { InputStyled, inputStyles } from '../../../elements/input';
import Modal from '../../../elements/modal';
import { useOutsideAlerter } from '../../../../hooks/outsideAlerter';
import DatePicker, { registerLocale } from 'react-datepicker';
import { firestore } from '../../../../services/firebase';

import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { Dropdown } from '../../../elements/dropdown';
import PhoneInput from '../../../elements/phone-input';
import PlaceOrder from '../../../../services/placeOrder';

registerLocale('ru', ru);

const OrderPageStyled = styled.div`
  max-width: 800px;
  width: 70%;
  margin: auto;
  display: grid;
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
      .react-datepicker-wrapper {
        width: 100%;
      }
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
      div {
        /* display: grid; */
      }
      .input_label {
        display: block;
        margin-bottom: 5px;
        margin-left: 15px;
        color: ${({ theme }) => theme.textGrey};
      }
    }
  }
`;

const ModalContentStyled = styled.div`
  display: grid;
  grid-template-rows: min-content 3fr 135px;
  height: 100%;
  .modal_top {
    display: grid;
    padding: 20px;
    height: 60px;
    .close_cross {
      justify-self: flex-end;
      height: fit-content;
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
      margin-bottom: 50px;
    }
    p {
      font-size: 18px;
      line-height: 30px;
      font-weight: 300;
    }
  }
  .modal_button {
    padding: 50px;
  }
`;

const DatePickerStyled = styled(DatePicker)`
  ${inputStyles}
`;

const OrderPage = ({
  backToMain,
  setDeliveryDate,
  deliveryDate,
  setDeliveryTime,
  deliveryTime,
  phoneOnUnloading,
  setPhone,
  orderComment,
  setComment,
  phone,
  time,
  deliveryDateHuman,
  name,
  address,
  weight
}) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false);
  const [loading, setLoading] = useState(0);

  async function makeOrderClick() {
    setLoading(1);
    await PlaceOrder({deliveryDateHuman, deliveryTime, phoneOnUnloading, orderComment, time, phone, name, address, weight})
    setLoading(0);
    setVisible(true);
  }

  return (
    <OrderPageStyled>
      <h1>Оформление заказа</h1>
      <div className="order_form">
        <div className="order_column">
          <div>
            <span className="input_label">* Дата доставки</span>
            <DatePickerStyled
              placeholderText="Выберете дату"
              selected={deliveryDate || ''}
              minDate={new Date()}
              locale="ru"
              dateFormat="dd-MM-yyyy"
              onChange={date => {
                setDeliveryDate(date);
              }}
            />
          </div>
          <div>
            <span className="input_label">Время доставки</span>
            <Dropdown
              callback={(title, id) => setDeliveryTime(title)}
              selectedItem={deliveryTime}
              withBorder={true}
              list={[
                { title: '09:00', id: 0 },
                { title: '10:00', id: 1 },
                { title: '11:00', id: 2 },
                { title: '12:00', id: 3 },
                { title: '13:00', id: 4 },
                { title: '14:00', id: 5 },
                { title: '15:00', id: 6 },
                { title: '16:00', id: 7 },
                { title: '17:00', id: 8 },
                { title: '18:00', id: 9 },
                { title: '19:00', id: 10 },
              ]}
            />
          </div>
          <div>
            <span className="input_label">* Телефон на выгрузке</span>
            <PhoneInput border placeholder="Телефон на выгрузке" value={phoneOnUnloading} onChange={setPhone} />
          </div>
        </div>
        <div className="order_column">
          <div className="text_area_wrapper">
            <span className="input_label">Добавить коментарий</span>
            <textarea
              placeholder="Например, время доставки и тд."
              value={orderComment || ''}
              onChange={e => setComment(e.target.value)}
              className="text_area"></textarea>
          </div>
          <div>
            <PrimaryButton
              loading={loading}
              primaryDisable={!deliveryDate || !deliveryTime || phoneOnUnloading.length !== 19 || !orderComment}
              onClick={makeOrderClick}>
              Оформить заказ
            </PrimaryButton>
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
              <p>
                Наш менеджер свяжется с вами
                <br />в течении 10 минут.
              </p>
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
  setDeliveryDate: value => dispatch({ type: t.SET_DELIVERY_DATE, payload: value }),
  setDeliveryTime: value => dispatch({ type: t.SET_DELIVERY_TIME, payload: value }),
  setPhone: value => dispatch({ type: t.SET_PHONE_ON_UNLOADING, payload: value }),
  setComment: value => dispatch({ type: t.SET_ORDER_COMMENT, payload: value }),
});
const mapStateToProps = ({ order, globalData, firstPage }) => ({
  deliveryDate: order.deliveryDate,
  deliveryDateHuman: order.deliveryDateHuman,
  deliveryTime: order.deliveryTime,
  phoneOnUnloading: order.phoneOnUnloading,
  orderComment: order.orderComment,
  time: globalData.time,
  phone: firstPage.customerPhone,
  name: firstPage.customerName,
  address: firstPage.customerAddress,
  weight: firstPage.materialWeight
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
