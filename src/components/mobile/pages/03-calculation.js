import React from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';
import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import { LabelStyled } from './01-anketa';
import { InputStyled } from '../../elements/input';
import * as t from '../../../redux/actionTypes';
import { NavLink } from 'react-router-dom';

const CalculationVolumeStyled = styled(AnketaPageStyled)`
  .additional_text {
    font-size: 1rem;
    color: ${({ theme }) => theme.textGrey};
    font-weight: 300;
    text-align: center;
    margin-bottom: 35px;
  }
`;
function CalculationVolumePage({ dispatch, materialWeight, materialVolume }) {
  function handleNextClick() {
    dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.MAP_PAGE });
  }

  return (
    <CalculationVolumeStyled>
      <MobileHeader title="Калькулятор объема" />
      <div>
        <p className="additional_text">
          Введите вес для автоматического
          <br /> рассчёта объема
        </p>
        <div className="input_field_wrapper">
          <LabelStyled>Вес (тонн)</LabelStyled>
          <InputStyled
            value={materialWeight || ''}
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
            value={materialVolume || ''}
            onChange={e => dispatch({ type: t.SET_MATERIAL_VOLUME, payload: e.target.value })}
            // disabledInput={!materialTypeTitle}
            placeholder="Обьем"
            type="number"
            border
          />
        </div>
      </div>
      <div>
        {/* <GreyButton
          onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.VYBOR_TOVARA_PAGE })}
          style={{ marginBottom: '20px' }}>
          Назад
        </GreyButton> */}
        <NavLink to='/map'>
        <PrimaryButton primaryDisable={!materialWeight} onClick={handleNextClick}>Далее</PrimaryButton>
        </NavLink>
      </div>
    </CalculationVolumeStyled>
  );
}

const mapStateToProps = ({ firstPage }) => ({
  materialWeight: firstPage.materialWeight,
  materialVolume: firstPage.materialVolume,
});
export default connect(mapStateToProps)(CalculationVolumePage);
