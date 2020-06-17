import React from "react"
import styled from "styled-components"
import { AnketaPageStyled } from "./01-anketa"
import MobileHeader from "./header/header"
import { PrimaryButton } from "../../elements/buttons"
import { connect } from "react-redux"
// import * as t from "../../../redux/actionTypes"
import MapComponent from "../../desktop/main-content/01_calculate/white-section/map"
import InputPlaces from "../../desktop/main-content/01_calculate/white-section/places-input"
import { history } from "../mobile"

const MapStyled = styled(AnketaPageStyled)`
  .content_wrapper {
    align-self: flex-start;
    height: 100%;
    .map_wrapper {
      height: 100%;
      margin: 0;
      width: 100%;
      padding-bottom: 44px;
      margin: 0;
    }
  }
`

function MapPage({ dispatch, customerAddress, selectedCoordinates }) {
  function handleNextTap() {
    if(selectedCoordinates) history.push("/payment-method")
  }
  return (
    <MapStyled>
      <MobileHeader title="Адрес доставки" withButton navLinkTo="calculations" />
      <div className="content_wrapper">
        <div className="input_field_wrapper">
          <InputPlaces address={customerAddress} dispatch={dispatch} />
        </div>
        <div className="map_wrapper">
          <MapComponent style={{ height: "100%" }} />
        </div>
      </div>

      <div>
        <PrimaryButton
          primaryDisable={!selectedCoordinates}
          onClick={handleNextTap}>
          Далее
        </PrimaryButton>
      </div>
    </MapStyled>
  )
}

const mapStateToProps = ({ firstPage, globalData }) => ({
  customerAddress: firstPage.customerAddress,
  selectedCoordinates: globalData.selectedCoordinates,
})
export default connect(mapStateToProps)(MapPage)
