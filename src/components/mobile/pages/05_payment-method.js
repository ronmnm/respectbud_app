import React, { useState } from "react"
import styled from "styled-components"
import { AnketaPageStyled } from "./01-anketa"
import MobileHeader from "./header/header"
import { PrimaryButton } from "../../elements/buttons"
import { Dropdown } from "../../elements/dropdown"
import { connect } from "react-redux"
import { LabelStyled } from "./01-anketa"
import * as t from "../../../redux/actionTypes"
import { getPrice } from "../../../services/get-price"
// import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom"
// import ResultPage from '../../desktop/main-content/02_result/result-page';
import { history } from "../mobile"
import notifyBot from "../../../services/notify-bot"

// const history = createBrowserHistory();

const PaymentStyled = styled(AnketaPageStyled)`
  .content_wrapper {
    align-self: flex-start;
    margin-top: 20px;
  }
`

function PaymentMethodPage({
  dispatch,
  paymentMethodList,
  paymentMethod,
  addr,
  materialTypeTitle,
  materialTitle,
  weight,
  paymentA,
  coords,
  phone,
  customerName,
  finalPrice,
  customerOrganization,
}) {
  const [loading, setLoading] = useState(0)

  const makeCalculations = async () => {
    setLoading(1)
    const time = new Date().toLocaleString()
    dispatch({ type: t.SET_CALCULATION_TIMESTAMP, payload: time })
    const result = (await getPrice({
      address: addr,
      materialTitle,
      materialType: materialTypeTitle,
      weight,
      paymentMethod: paymentA,
      coordinates: coords,
      phone,
      time,
    })).data

    dispatch({ type: t.SET_FINAL_PRICE, payload: result.pickedPriceRound })
    dispatch({ type: t.SET_30T_PRICE, payload: null })
    if (result.price30t) {
      dispatch({ type: t.SET_30T_PRICE, payload: result.price30t })
    }
    setLoading(0)
    history.push("/result")
    notifyBot({
      event: "DO_CALCULATION",
      payload: {
        phone,
        name: customerName,
        addr,
        organization: customerOrganization,
        weight,
        material: materialTypeTitle,
        finalPrice: result.pickedPriceRound,
      },
    })
  }

  return (
    <Router history={history}>
      <PaymentStyled>
        <MobileHeader title="Форма оплаты" withButton navLinkTo="map" />
        <div className="content_wrapper">
          <div className="input_field_wrapper">
            <LabelStyled style={{ marginBottom: "15px" }}>* Выберите форму оплаты</LabelStyled>
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
  )
}

const mapStateToProps = ({ globalData, firstPage }) => ({
  paymentMethodList: globalData.paymentMethodList,
  paymentMethod: firstPage.customerPaymentMethod,
  addr: firstPage.customerAddress,
  materialTypeTitle: firstPage.materialTypeTitle,
  materialTitle: firstPage.materialTitle,
  weight: firstPage.materialWeight,
  paymentA: firstPage.paymentMethodAlias,
  coords: globalData.selectedCoordinates,
  phone: firstPage.customerPhone,
  customerName: firstPage.customerName,
  finalPrice: globalData.finalPrice,
  customerOrganization: firstPage.customerOrganization,
})

export default connect(mapStateToProps)(PaymentMethodPage)
