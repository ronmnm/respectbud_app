import React from 'react';
import styled from 'styled-components';
import BlackSection from './black-section/black-section';
import WhiteSection from './white-section/white-section';
import { connect } from 'react-redux';

const MainSectionStyled = styled.div`
   display: grid;
   grid-template-rows: min-content 1fr;
   .main_section_wrapper {
   }
`;
const MainSection = ({ whiteSection, blackSection }) => {
   return (
      <MainSectionStyled>
         <BlackSection {...blackSection} />
         <WhiteSection whiteSection={whiteSection} />
      </MainSectionStyled>
   );
};

const mapStateToProps = ({ firstPage }) => ({
   whiteSection: {
      customerName: firstPage.customerName,
      customerOrganization: firstPage.customerOrganization,
      customerPhone: firstPage.customerPhone,
      customerPaymentMethod: firstPage.customerPaymentMethod,
      addr: firstPage.customerAddress,
   },
   blackSection: {
      materialTitle: firstPage.materialTitle,
      materialTypeTitle: firstPage.materialTypeTitle,
      materialsList: firstPage.materialsList,
      materialsTypeList: firstPage.materialsTypeList,
      materialWeight: firstPage.materialWeight,
      materialVolume: firstPage.materialVolume,
   },
});
export default connect(mapStateToProps)(MainSection);

