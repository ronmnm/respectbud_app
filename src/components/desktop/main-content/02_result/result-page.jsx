import React, { useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import * as t from "../../../../redux/actionTypes"
import { PrimaryButton, GreyButton } from "../../../elements/buttons"
import { history } from "../main-content"
import { NavLink } from "react-router-dom"
import changeOrder from "../../../../services/set30tOrder"
import notifyBot from "../../../../services/notify-bot"
import { firestore } from "../../../../services/firebase"


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
    grid-template-columns: repeat(auto-fill, minmax(150px, 240px));
    grid-auto-flow: column;
    column-gap: 20px;
    div {
      min-width: 200px;
    }
    /* width: max-content; */
  }
`

const ResultPage = ({ dispatch, finalPrice, price30t, phone, time, name, organization, material, weight }) => {
  let dataForBot = { phone, name, organization, material, weight, finalPrice }

  useEffect(() => {
    let data = JSON.stringify(dataForBot)
    const sendBeacon = () => {
      let url = "https://europe-west1-inbound-analogy-278220.cloudfunctions.net/leavePage"
      navigator.sendBeacon(url, data)
    }
    window.addEventListener("unload", sendBeacon)
    console.log("unload")
    return () => {
      window.removeEventListener('unload', sendBeacon)
      console.log("clear")
    }
  }, [])

  const handleBack = () => {
    notifyBot({ event: "CALC_AGAIN_BUTTON", payload: { ...dataForBot } })
    history.push("/")
  }

  async function handle30tOrder() {
    dispatch({ type: t.SET_FINAL_PRICE, payload: price30t })
    dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: 30 })
    changeOrder({ phone, time, price: price30t })

  }
  return (
    <ResultStyled>
      <h1>Результат</h1>
      <h3>
        Цена с доставкой составляет: <span>{finalPrice} грн</span>{" "}
      </h3>
      {price30t && (
        <h3 style={{ fontSize: "16px" }}>
          Цена 30-ти тонн с доставкой: <span>{price30t} грн</span>{" "}
        </h3>
      )}
      <div className="buttons_wrap">
        <div>
          <GreyButton onClick={handleBack}>Рассчитать заново</GreyButton>
        </div>
        {price30t && (
          <div>
            <NavLink to="/order">
              <GreyButton onClick={handle30tOrder}>Заказать 30т</GreyButton>
            </NavLink>
          </div>
        )}
        <div>
          <NavLink to="/order">
            <PrimaryButton>Заказать</PrimaryButton>
          </NavLink>
        </div>
      </div>
    </ResultStyled>
  )
}

const mapStateToProps = ({ globalData, firstPage }) => ({
  finalPrice: globalData.finalPrice,
  price30t: globalData.price30t,
  phone: firstPage.customerPhone,
  time: globalData.time,
  name: firstPage.customerName,
  organization: firstPage.customerOrganization,
  material: firstPage.materialTypeTitle,
  weight: firstPage.materialWeight,
  addr: firstPage.customerAddress,
})

export default connect(mapStateToProps)(ResultPage)
