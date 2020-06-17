import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { AnketaPageStyled } from "./01-anketa"
import MobileHeader from "./header/header"
import { PrimaryButton } from "../../elements/buttons"
import { connect } from "react-redux"
import { LabelStyled } from "./01-anketa"
import { InputStyled } from "../../elements/input"
import * as t from "../../../redux/actionTypes"
import { checkWeight } from "../../../utils/utils"
import Tooltip from "../../elements/tooltip"
import { history } from "../mobile"

const CalculationVolumeStyled = styled(AnketaPageStyled)`
  .additional_text {
    font-size: 1rem;
    color: ${({ theme }) => theme.textGrey};
    font-weight: 300;
    text-align: center;
    margin-bottom: 35px;
  }
`
/**
 * CalculationVolumePage
 * @param {*} param0
 */
function CalculationVolumePage({ dispatch, materialWeight, materialVolume }) {
  let [weightError, setWeightError] = useState(false)
  // let [isButtonDisable, setIsButtonDisable] = useState(true)

  useEffect(() => {
    if (checkWeight(materialWeight)) {
      setWeightError(true)
    } else {
      setWeightError(false)
    }
  }, [materialWeight])

  function handleNextClick() {
    if(!weightError || materialWeight) history.push("./map")
  }

  return (
    <CalculationVolumeStyled>
      <MobileHeader title="Калькулятор объема" withButton navLinkTo="material" />
      <div>
        <p className="additional_text">
          Введите вес для автоматического
          <br /> рассчёта объема
        </p>
        <div className="input_field_wrapper">
          <LabelStyled>Вес (тонн)</LabelStyled>
          <Tooltip onError={weightError} text="Вы можете ввести значение от 1 до 30 тонн или 40 тонн." />
          <InputStyled
            hasError={weightError}
            value={materialWeight || ""}
            onChange={e => dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: +e.target.value })}
            placeholder="Вес"
            step="1"
            type="number"
            border
          />
        </div>
        <div className="input_field_wrapper">
          <LabelStyled>Объём (м³)</LabelStyled>
          <InputStyled
            value={materialVolume || ""}
            onChange={e => dispatch({ type: t.SET_MATERIAL_VOLUME, payload: e.target.value })}
            placeholder="Обьем"
            type="number"
            border
          />
        </div>
      </div>
      <div>
        <PrimaryButton primaryDisable={!materialWeight || checkWeight(materialWeight)} onClick={handleNextClick}>
          Далее
        </PrimaryButton>
      </div>
    </CalculationVolumeStyled>
  )
}

const mapStateToProps = ({ firstPage }) => ({
  materialWeight: firstPage.materialWeight,
  materialVolume: firstPage.materialVolume,
})
export default connect(mapStateToProps)(CalculationVolumePage)
