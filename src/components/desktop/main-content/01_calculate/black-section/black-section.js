import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { InputStyled } from "../../../../elements/input"
import { Dropdown } from "../../../../elements/dropdown"
import { connect } from "react-redux"
import * as t from "../../../../../redux/actionTypes"
import SvgArrow from "../../../../../static/arrow"
import Tooltip from "../../../../elements/tooltip"
import { checkWeight } from "../../../../../utils/utils"

const BlackStyled = styled.div`
  background-color: ${({ theme }) => theme.black};
  height: 155px;
  .black_section_wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 208px 208px;
    align-items: center;
    column-gap: 15px;
    max-width: ${({ theme }) => theme.mainWidth};
    margin: 0 auto;
    padding: 35px 50px;
    .number_input_wrapper {
      position: relative;
      .arrows {
        position: absolute;
        height: 48px;
        right: 0;
        .arrow_bottom,
        .arrow_up {
          height: 50%;
          padding: 0 5px;
          display: flex;
          align-items: center;
          transition: 0.2s;
          svg {
            height: 12px;
            fill: ${({ theme }) => theme.textGrey};
          }
          &:hover {
            cursor: pointer;
            /* background-color: ${({ theme }) => theme.grey}; */
            svg {
              fill: ${({ theme }) => theme.black};
            }
          }
        }
        .arrow_bottom {
          svg {
            transform: rotate(90deg);
            padding-right: 5px;
          }
        }
        .arrow_up {
          svg {
            transform: rotate(-90deg);
            padding-right: 5px;
          }
        }
      }
    }
  }
  color: white;
`
const LabelStyled = styled.div`
  display: inline-block;
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 14px;
`

const InputStyledNumber = styled(InputStyled)`
  -moz-appearance: textfield;
  border: 1px solid black;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    -moz-appearance: textfield;
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    /* border: 1px solid black; */
  }
`
let HintWeightStyled = styled.div`
  display: inline-block;
  margin-left: 5px;
  position: relative;
  height: 100%;
  width: 30px;
  height: 12px;
`

const BlackSection = ({
  materialsList,
  materialsTypeList,
  setMaterial,
  setMaterialType,
  materialTitle,
  materialTypeTitle,
  materialWeight,
  materialVolume,
  dispatch,
}) => {
  let [weightError, setWeightError] = useState(false)

  useEffect(() => {
    if (checkWeight(materialWeight)) {
      setWeightError(true)
    } else {
      setWeightError(false)
    }
  }, [materialWeight])

  const handleMaterialWeight = value => {
    dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: +value })
  }

  const handleMaterialVolume = value => {
    dispatch({ type: t.SET_MATERIAL_VOLUME, payload: value })
  }
  function handleArrowClick(type, action, property) {
    if (type === "inc") {
      dispatch({ type: action, payload: +property + 1 })
    }
    if (type === "dec" && property > 0.99) {
      dispatch({ type: action, payload: +property - 1 })
    }
  }
  return (
    <BlackStyled>
      <div className="black_section_wrapper">
        <div>
          <LabelStyled>Материал</LabelStyled>
          <Dropdown list={materialsList} callback={setMaterial} selectedItem={materialTitle} />
        </div>
        <div>
          <LabelStyled>Вид</LabelStyled>
          <Dropdown
            list={materialsTypeList}
            callback={setMaterialType}
            selectedItem={materialTypeTitle}
            disabled={materialsTypeList}
          />
        </div>
        <div className="number_input_wrapper">
          <LabelStyled>Вес (тонн)</LabelStyled>
          <HintWeightStyled>
            <Tooltip onError={weightError} text="Вы можете ввести значение от 1 до 30 тонн или 40 тонн." />
          </HintWeightStyled>
          <div className="arrows">
            <div className="arrow_up" onClick={() => handleArrowClick("inc", t.SET_MATERIAL_WEIGHT, materialWeight)}>
              <SvgArrow />
            </div>
            <div
              onClick={() => handleArrowClick("dec", t.SET_MATERIAL_WEIGHT, materialWeight)}
              className="arrow_bottom">
              <SvgArrow />
            </div>
          </div>
          <InputStyledNumber
            border
            hasError={weightError}
            value={materialWeight || ""}
            onChange={e => handleMaterialWeight(e.target.value)}
            disabledInput={!materialTypeTitle}
            placeholder="Вес"
            step="1"
            type="number"></InputStyledNumber>
        </div>
        <div className="number_input_wrapper">
          <LabelStyled>Объём (м³)</LabelStyled>
          <div className="arrows">
            <div className="arrow_up" onClick={() => handleArrowClick("inc", t.SET_MATERIAL_VOLUME, materialVolume)}>
              <SvgArrow />
            </div>
            <div
              onClick={() => handleArrowClick("dec", t.SET_MATERIAL_VOLUME, materialVolume)}
              className="arrow_bottom">
              <SvgArrow />
            </div>
          </div>
          <InputStyledNumber
            value={materialVolume || ""}
            onChange={e => handleMaterialVolume(e.target.value)}
            disabledInput={!materialTypeTitle}
            placeholder="Обьем"
            type="number"
          />
        </div>
      </div>
    </BlackStyled>
  )
}

const mapDispatchToProps = dispatch => ({
  setMaterial: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL, payload: materialTitle, id: id }),
  setMaterialType: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL_TYPE, payload: materialTitle, id: id }),
  dispatch: dispatch,
})

export default connect(null, mapDispatchToProps)(BlackSection)
