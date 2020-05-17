import styled, { css } from 'styled-components';

export const PrimaryButton = styled.span`
   height: 46px;
   background-color: ${({ theme }) => theme.yellowPrimary};
   border: 1px solid ${({ theme }) => theme.yellowPrimary};
   line-height: 48px;
   text-align: center;
   color: ${({ theme }) => theme.textBlack};
   display: block;
   width: 100%;
   transition: 0.2s;
   font-size: 16px;
   &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.yellowHover};
      border: 1px solid ${({ theme }) => theme.yellowHover};
   }
   &:active {
      transition: 0s;
      border: 1px solid ${({ theme }) => theme.black};
   }
   ${({ primaryDisable }) => {
      if (primaryDisable) {
         return css`
            background-color: ${({ theme }) => theme.yellowPrimaryDis}; 
            color: #c9c183;
            pointer-events: none;
            &:hover{
               cursor: default;
            }
         `;
      }
   }};
`;

export const GreyButton = styled(PrimaryButton)`
   background-color: ${({ theme }) => theme.white};
   border: 1px solid ${({ theme }) => theme.black};
   color: ${({ theme }) => theme.textBlack};
   &:hover {
      background-color: ${({ theme }) => theme.grey};
      border: 1px solid ${({ theme }) => theme.black};
   }
   &:active {
      transition: 0s;
      background-color: ${({ theme }) => theme.black};
      color: ${({ theme }) => theme.white};
   }
`;
