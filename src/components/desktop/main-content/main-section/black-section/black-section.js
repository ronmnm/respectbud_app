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
}) => {
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
               <InputStyled placeholder="Вес" />
            </div>
            <div>
               <LabelStyled>Объём (м³)</LabelStyled>
               <InputStyled placeholder="Обьем" />
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
});

const mapDispatchToProps = dispatch => ({
   setMaterial: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL, payload: materialTitle, id: id }),
   setMaterialType: (materialTitle, id) => dispatch({ type: t.SET_MATERIAL_TYPE, payload: materialTitle, id: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSection);
