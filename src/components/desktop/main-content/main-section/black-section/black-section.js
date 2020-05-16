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
   // handleMaterialWeight,
   // handleMaterialVolume,
   dispatch
}) => {
   const handleMaterialWeight = (value) => {
      dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: +value})
      // const calculatedVolume = value * 0.625;
      // dispatch({ type: t.SET_MATERIAL_VOLUME, payload: calculatedVolume })
   }

   const handleMaterialVolume = (value) => {
      dispatch({ type: t.SET_MATERIAL_VOLUME, payload: value })
      // console.log(value * 1.6);
      // const calculatedWeight = Math.ceil(value * 1.6);
      // dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: calculatedWeight })
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
                  // type='number'
                  value={materialWeight || ''}
                  onChange={e => handleMaterialWeight(e.target.value)}
                  disabledInput={!materialTypeTitle}
                  placeholder="Вес"
                  step="1"
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
                  // step="1"
               />
            </div>
         </div>
      </BlackStyled>
   );
};

const mapStateToProps = ({ material }) => ({
   materialTitle: material.materialTitle,
   materialTypeTitle: material.materialTypeTitle,
   materialsList: material.materialsList,
   materialsTypeList: material.materialsTypeList,
   materialWeight: material.materialWeight,
   materialVolume: material.materialVolume,
});

const mapDispatchToProps = dispatch => ({
   setMaterial: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL, payload: materialTitle, id: id }),
   setMaterialType: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL_TYPE, payload: materialTitle, id: id }),
   // handleMaterialWeight: value => dispatch({ type: t.SET_MATERIAL_WEIGHT, payload: value }),
   // handleMaterialVolume: value => dispatch({ type: t.SET_MATERIAL_VOLUME, payload: value }),
   dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSection);
