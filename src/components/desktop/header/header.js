import React from 'react';
import styled from 'styled-components';
import logo from '../../../img/logo.png';

const HeaderStyled = styled.div`
   /* display: grid; */
   /* grid-template-rows: minmax(50px, 30vh); */
   height: 10vh;
   min-height: 50px;
   max-height: 130px;
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
   height: 100%;
   display: grid;
   align-items: center;
   img {
      height: 60%;
   }
`;
const PhonesHeader = styled.div`
   background-color: red;
`;

const Header = () => {
   return (
      <HeaderStyled>
         <div className="header_wrapper">
            <LogoHeader>
               <img src={logo} alt="" />
            </LogoHeader>
            <PhonesHeader>096-999-99-00</PhonesHeader>
         </div>
      </HeaderStyled>
   );
};

export default Header;
