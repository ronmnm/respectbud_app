import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { PrimaryButton } from "../../../../elements/buttons"
import { InputStyled } from "../../../../elements/input"
import PhoneInput from "../../../../elements/phone-input"
import { connect } from "react-redux"
import * as t from "../../../../../redux/actionTypes"
import { Dropdown } from "../../../../elements/dropdown"
import { registerNewCustomer } from "../../../../../services/register"
import { getPrice } from "../../../../../services/get-price"
import InputPlaces from "./places-input"

import { history } from "../../main-content"
import { checkWeight } from "../../../../../utils/utils"
import notifyBot from "../../../../../services/notify-bot"

const CalculateFormStyled = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  .necessary_field {
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.textGrey};
    margin-left: 30px;
  }
  .calculate_form_wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 280px;
    column-gap: 20px;
    padding-left: 20px;
    margin-bottom: 20px;
    .calculate_form_column {
      display: grid;
      align-items: flex-end;
      grid-template-rows: repeat(3, 1fr);
      .input_label {
        display: inline-block;
        margin-bottom: 5px;
        margin-left: 15px;
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.textGrey};
      }
    }
  }
`

const CalculateForm = ({
  dispatch,
  customerName,
  customerOrganization,
  customerPaymentMethod,
  addr,
  weight,
  paymentMethodList,
  materialTypeTitle,
  paymentMethodAlias,
  selectedCoordinates,
  phone,
  materialTitle,
}) => {
  const [isLoading, setIsLoading] = useState(0)
  // async function notifyBeforeClose() {
  //   await notifyBot({
  //     event: "TAB_CLOSED",
  //     payload: { phone, name: "yo", organization: "blo", material: "bla", weight, finalPrice: "mil" },
  //   })
  // }
  // useEffect(() => {
  //   window.addEventListener("beforeunload", async ev => {
  //     ev.preventDefault()
  //     return await notifyBeforeClose()
  //   })
  // }, [])
  // useEffect(() => {
  //   window.addEventListener("unload", function () {
  //     let data = new FormData()
  //     data.append("hello", "world")
  //     navigator.sendBeacon("https://europe-west1-inbound-analogy-278220.cloudfunctions.net/leavePage", data)
  //   })

    // window.onbeforeunload = async () => {
    //   return notifyBot({
    //     event: "TAB_CLOSED",
    //     payload: { phone, name: "yo", organization: "blo", material: "bla", weight, finalPrice: "mil" },
    //   })
    //   console.log("lorem tdoudeoudoen hdnoedh nudoen uoetdu tohed")
    // }
  // })
  function fake() {
    let real = 'https://europe-west1-inbound-analogy-278220.cloudfunctions.net/leavePage'
    let fakeurl = 'http://localhost:5001/inbound-analogy-278220/europe-west1/leavePage'

    navigator.sendBeacon(real, JSON.stringify({ab: 5, you: 'string'}))
    // let obj = {}
    // let arr = [...data]
    // for(let i = 0; arr.length > i; i++){
    //   obj[arr[i][0]] = arr[i][1]
    // }
    // console.log(obj)
  }


  async function handleCalculateClick() {
    setIsLoading(1)
    await registerNewCustomer(customerName, phone, customerOrganization)

    const time = new Date().toLocaleString()
    dispatch({ type: t.SET_CALCULATION_TIMESTAMP, payload: time })
    const result = await getPrice(
      addr,
      materialTitle,
      materialTypeTitle,
      weight,
      paymentMethodAlias,
      selectedCoordinates,
      phone,
      time
    )
    console.log("Финальная цена", result)
    dispatch({ type: t.SET_FINAL_PRICE, payload: result.pickedPriceRound })
    if (result.price30t) {
      dispatch({ type: t.SET_30T_PRICE, payload: result.price30t })
    }
    setIsLoading(0)
    history.push("/result")
    notifyBot({ event: "DO_CALCULATION", payload: { phone, name: customerName, addr, weight, materialTypeTitle } })
  }

  // function getError() {}
  return (
    <CalculateFormStyled>
      <div>
        <div className="calculate_form_wrapper">
          <div className="calculate_form_column">
            <div>
              <span className="input_label">* Ваше имя</span>
              <InputStyled
                border
                placeholder="Имя"
                value={customerName || ""}
                onChange={e => dispatch({ type: t.SET_CUSTOMER_NAME, payload: e.target.value })}
              />
            </div>
            <div>
              <span className="input_label">Название организации</span>
              <InputStyled
                border
                placeholder="ТОВ"
                value={customerOrganization || ""}
                onChange={e => dispatch({ type: t.SET_CUSTOMER_ORGANIZATION, payload: e.target.value })}
              />
            </div>
            <div>
              <span className="input_label">* Номер телефона</span>
              <PhoneInput
                value={phone || ""}
                onChange={value => dispatch({ type: t.SET_CUSTOMER_PHONE, payload: value })}
              />
            </div>
          </div>
          <div className="calculate_form_column">
            <div>
              <span className="input_label">* Форма оплаты</span>
              <Dropdown
                selectedItem={customerPaymentMethod}
                callback={(title, id, alias) =>
                  dispatch({ type: t.SET_CUSTOMER_PAYMENT_METHOD, payload: title, alias })
                }
                withBorder={true}
                list={paymentMethodList}
              />
            </div>
            <div>
              <span className="input_label">* Адрес</span>
              <InputPlaces address={addr} dispatch={dispatch} />
            </div>
            <PrimaryButton
              loading={isLoading}
              primaryDisable={
                !customerName ||
                phone.length !== 19 ||
                !customerPaymentMethod ||
                !selectedCoordinates ||
                !addr ||
                checkWeight(weight)
              }
              onClick={handleCalculateClick}>
              Рассчитать
            </PrimaryButton>
            {/* <button onClick={fake}>оnohunoehunoehuoeп</button> */}
          </div>
        </div>
        <span className="necessary_field">* - Обязательное к заполнению поле</span>
      </div>
    </CalculateFormStyled>
  )
}

const mapStateToProps = ({ firstPage, globalData }) => ({
  weight: firstPage.materialWeight,
  paymentMethodList: globalData.paymentMethodList,
  materialTypeTitle: firstPage.materialTypeTitle,
  paymentMethodAlias: firstPage.paymentMethodAlias,
  selectedCoordinates: globalData.selectedCoordinates,
  phone: firstPage.customerPhone,
  materialTitle: firstPage.materialTitle,
})

export default connect(mapStateToProps)(CalculateForm)
