import React from 'react';
import styled from 'styled-components';
import logo from '../../../../img/logo.png';

const HeaderStyled = styled.div`
   /* display: grid; */
   /* justify-content: center; */
   /* align-items: center; */
   /* height: 13vh; */
   background-color: white;
      img {
         height: 8vh;
         margin: 0 auto;
         display: block;
      }
   
`;
const TitleStyled = styled.h3`
   text-align: center;
   font-weight: 400;
   color: ${({ theme }) => theme.black};
   font-size: 1.1rem;
   margin-top: 5vh;
   margin-bottom: 2vh;
`;

function MobileHeader({ title }) {
   return (
      <HeaderStyled>
         
            <img src={logo} alt="" />
         
         <TitleStyled>{title}</TitleStyled>
      </HeaderStyled>
   );
}
export default MobileHeader;
