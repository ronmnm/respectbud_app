import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.div`
   /* background-color: ${({ theme }) => theme.black}; */
   height: 128px;
   .header_wrapper {
      display: grid;
      justify-content: space-between;
      align-items: center;
      grid-auto-flow: column;
      max-width: ${({ theme }) => theme.mainWidth};
      height: 100%;
      margin: 0 auto;
      padding: 0 50px;
   }
`;
const LogoHeader = styled.div`
   background-color: yellow;
   width: 30px;
   height: 30px;
`;
const PhonesHeader = styled.div`
   background-color: red;
`;

const Header = () => {
   return (
      <HeaderStyled>
         <div className="header_wrapper">
            <LogoHeader>Logo</LogoHeader>
            <PhonesHeader>096-999-99-00</PhonesHeader>
         </div>
      </HeaderStyled>
   );
};

export default Header;