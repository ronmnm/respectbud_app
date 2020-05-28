import React from 'react';
import styled from 'styled-components';
import MapSection from './map';
import CalculateForm from './calculate-form';

const WhiteStyled = styled.div`
  .white_section_wrapper {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    column-gap: 40px;
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
const WhiteSection = ({ whiteSection }) => {
  return (
    <WhiteStyled>
      <div className="white_section_wrapper">
        <MapSection />
        <CalculateForm {...whiteSection} />
      </div>
    </WhiteStyled>
  );
};
export default WhiteSection;
