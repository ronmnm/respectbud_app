import React from 'react';
import styled from 'styled-components';
import MapSection from './map';
import CalculateForm from './calculate-form';

const WhiteStyled = styled.div`
   /* display: grid; */
   /* height: 100%; */
   
   .white_section_wrapper {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      /* row-gap: 40px; */
      height: 100%;
      max-width: ${({ theme }) => theme.mainWidth};
      margin: 0 auto;
      padding: 0 50px;
      /* background-color: lightcoral; */
   }
   .button_wrapper {
      width: 200px;
      margin: 50px;
   }
`;
const WhiteSection = () => {
   return (
      <WhiteStyled>
         <div className="white_section_wrapper">
            <MapSection />
            <CalculateForm  />
         </div>
      </WhiteStyled>
   );
};
export default WhiteSection;
