import React from "react"
import styled from "styled-components"
import { AnketaPageStyled } from "./01-anketa"
import MobileHeader from "./header/header"
import { PrimaryButton, GreyButton } from "../../elements/buttons"
import { connect } from "react-redux"
import * as t from "../../../redux/actionTypes"
import {  NavLink } from "react-router-dom"
import { history } from "../mobile"
import changeOrder from "../../../services/set30tOrder"
import notifyBot from "../../../services/notify-bot"

const ResultStyled = styled(AnketaPageStyled)`
  .additional_text {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textGrey};
    font-weight: 300;
    text-align: center;
    margin-bottom: 35px;
  }
  .text_centered {
    margin: 30px 0;
    text-align: center;
    font-size: 2.3rem;
    font-weight: 500;
  }
  .additional_price {
    font-size: 14px;
    font-weight: 400;
    color: grey;
    text-align: center;
    div {
      margin-top: 6px;
    }
  }
`

function ResultPage({ dispatch, finalPrice, price30t, phone, time, paymentMethodList, customerName, customerOrganization, materialTypeTitle, weight }) {
  function handleCalculateAgain(){
    notifyBot({phone: `${customerName} ушел в отказ, вот его номер${phone} Организация: ${customerOrganization} Товар: ${materialTypeTitle} Вес: ${weight} Цена ${finalPrice}`})
    history.push('./material')
  }
  function handle30tOrder() {
    dispatch({ type: t.SET_FINAL_PRICE, payload: price30t })
    dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: 30 })
    changeOrder({ phone, time, price: price30t, })
    history.push('./order')
  }
  return (
    <ResultStyled>
      <MobileHeader title="Результат" />
      <div>
        <p className="additional_text">Цена с доставкой составляет:</p>
        <div className="input_field_wrapper">
          <h1 className="text_centered">{finalPrice} грн</h1>
        </div>
        {price30t && (
          <h3 className="additional_price">
            Цена 30-ти тонн с доставкой: <div>{price30t} грн</div>
          </h3>
        )}
      </div>
      <NavLink to="/order">
        <PrimaryButton onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.ORDER_MOBILE_PAGE })}>
          Заказать
        </PrimaryButton>
      </NavLink>
      {price30t && (
        <div>
          <GreyButton style={{ marginTop: "15px" }} onClick={handle30tOrder}>Заказать 30т</GreyButton>
        </div>
      )}
      <NavLink to="/material">
        <GreyButton
          style={{ marginTop: "15px" }}
          onClick={handleCalculateAgain}>
          Рассчитать заново
        </GreyButton>
      </NavLink>
    </ResultStyled>
  )
}

const mapStateToProps = ({ globalData, firstPage }) => ({
  paymentMethodList: globalData.paymentMethodList,
  finalPrice: globalData.finalPrice,
  price30t: globalData.price30t,
  phone: firstPage.customerPhone,
  time: globalData.time,
  customerName: firstPage.customerName,
  customerOrganization: firstPage.customerOrganization,
  materialTypeTitle: firstPage.materialTypeTitle,
  weight: firstPage.materialWeight,
})

export default connect(mapStateToProps)(ResultPage)
