import React from 'react';
import styled from 'styled-components';

const BlackStyled = styled.div`
   background-color: ${({theme}) => theme.black};
   height: 155px;
`;
const BlackSection = () => {
   return (
      <BlackStyled>
         <div>black</div>
      </BlackStyled>
   );
};
export default BlackSection;