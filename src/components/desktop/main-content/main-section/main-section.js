import React from 'react';
import styled from 'styled-components';
import BlackSection from './black-section/black-section';
import WhiteSection from './white-section/white-section';

const MainSectionStyled = styled.div`
   display: grid;
   grid-template-rows: min-content 1fr;
   .main_section_wrapper {
      
   }
`;
const MainSection = () => {
   return (
      <MainSectionStyled>
         
            <BlackSection />
            <WhiteSection />
         
      </MainSectionStyled>
   );
};

export default MainSection;
