import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.div`
  background-color: ${({ theme }) => theme.black};
  height: 40px;
  /* position: absolute; */
  /* bottom: 0; */
  width: 100%;
  .footer_wrapper {
    max-width: ${({ theme }) => theme.mainWidth};
    margin: 0 auto;
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100%;
    span {
      color: ${({ theme }) => theme.textGrey};
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <div className="footer_wrapper">
        <span>© Copyright Респект Буд ЛТД.</span>
      </div>
    </FooterStyled>
  );
};

export default Footer;
