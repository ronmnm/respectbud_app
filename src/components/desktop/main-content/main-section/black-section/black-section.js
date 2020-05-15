import React from 'react';
import styled from 'styled-components';
// import Select from 'react-select';
import { InputStyled } from '../../../../elements/input';

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
      padding: 0 50px;
      height: 100%;
      div {
         input {
            width: 100%;
            height: 48px;
         }
      }
   }
   color: white;
`;

// const options = [
//    { value: 'chocolate', label: 'Chocolate' },
//    { value: 'strawberry', label: 'Strawberry' },
//    { value: 'vanilla', label: 'Vanilla' },
// ];
const BlackSection = () => {
   return (
      <BlackStyled>
         <div className="black_section_wrapper">
            <div>
               <div>Материал</div>
               <InputStyled placeholder='Песок' />
            </div>
            <div>
               <div>Вид</div>
               <InputStyled placeholder='а' />
            </div>
            <div>
               <div>Вес (тонн)</div>
               <InputStyled placeholder='Вес' />
            </div>
            <div>
               <div>Объём (м³)</div>
               <InputStyled placeholder='Обьем' />
            </div>
         </div>
      </BlackStyled>
   );
};
export default BlackSection;
