import React from 'react';
import styled from 'styled-components';
import { InputStyled } from '../../../../elements/input';
import { Dropdown } from '../../../../elements/dropdown';
import { connect } from 'react-redux';
import * as t from '../../../../../redux/actionTypes';

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
   }
   color: white;
`;
const LabelStyled = styled.div`
   display: inline-block;
   margin-bottom: 5px;
   margin-left: 15px;
   font-size: 14px;
`;

const BlackSection = ({
   materialsList,
   materialsTypeList,
   setMaterial,
   setMaterialType,
   materialTitle,
   materialTypeTitle,
   materialWeight,
   materialVolume,
   dispatch
}) => {
   const handleMaterialWeight = (value) => {
      dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: +value})
   }

   const handleMaterialVolume = (value) => {
      dispatch({ type: t.SET_MATERIAL_VOLUME, payload: value })
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
            <div>
               <LabelStyled>Вес (тонн)</LabelStyled>
               <InputStyled
                  value={materialWeight || ''}
                  onChange={e => handleMaterialWeight(e.target.value)}
                  disabledInput={!materialTypeTitle}
                  placeholder="Вес"
                  step="1"
                  type='number'
               />
            </div>
            <div>
               <LabelStyled>Объём (м³)</LabelStyled>
               <InputStyled
                  value={materialVolume || ''}
                  onChange={e => handleMaterialVolume(e.target.value)}
                  disabledInput={!materialTypeTitle}
                  placeholder="Обьем"
                  type='number'
               />
            </div>
         </div>
      </BlackStyled>
   );
};



const mapDispatchToProps = dispatch => ({
   setMaterial: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL, payload: materialTitle, id: id }),
   setMaterialType: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL_TYPE, payload: materialTitle, id: id }),
   dispatch: dispatch
});

export default connect(null, mapDispatchToProps)(BlackSection);
