import React from 'react';
import styled from 'styled-components';
import { AnketaPageStyled } from './01-anketa';

import MobileHeader from './header/header';
import { PrimaryButton, GreyButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import * as t from '../../../redux/actionTypes';
import { Dropdown } from '../../elements/dropdown';
import { LabelStyled } from './01-anketa';

import { NavLink } from 'react-router-dom';

const VyborTovaraStyled = styled(AnketaPageStyled)`
  /* background-color: black; */
`;

function VyborTovaraPage({
  dispatch,
  materialsList,
  setMaterial,
  setMaterialType,
  materialTitle,
  materialsTypeList,
  materialTypeTitle,
}) {
  function handleNextClick() {
    dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.CALCULATOR_PAGE });
  }
  return (
    <VyborTovaraStyled>
      <MobileHeader title="Выбор товара" withButton navLinkTo='' />
      <div>
        <div className="input_field_wrapper">
          <LabelStyled>* Материал</LabelStyled>
          <Dropdown withBorder={true} list={materialsList} callback={setMaterial} selectedItem={materialTitle} />
        </div>
        <div className="input_field_wrapper">
          <LabelStyled>* Вид</LabelStyled>
          <Dropdown
            list={materialsTypeList}
            callback={setMaterialType}
            selectedItem={materialTypeTitle}
            disabled={materialsTypeList}
            withBorder={true}
          />
        </div>
      </div>
      <div>
        {/* <GreyButton
          onClick={() => dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.ANKETA_PAGE })}
          style={{ marginBottom: '20px' }}>
          Назад
        </GreyButton> */}
        <NavLink to="/calculations">
          <PrimaryButton primaryDisable={!materialTypeTitle} onClick={handleNextClick}>Далее</PrimaryButton>
        </NavLink>
      </div>
    </VyborTovaraStyled>
  );
}
const mapStateToProps = ({ firstPage }) => ({
  materialsList: firstPage.materialsList,
  materialTitle: firstPage.materialTitle,
  materialTypeTitle: firstPage.materialTypeTitle,
  materialsTypeList: firstPage.materialsTypeList,
});
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  setMaterial: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL, payload: materialTitle, id: id }),
  setMaterialType: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL_TYPE, payload: materialTitle, id: id }),
});
export default connect(mapStateToProps, mapDispatchToProps)(VyborTovaraPage);
