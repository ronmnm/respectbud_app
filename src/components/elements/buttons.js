
import styled from 'styled-components';

export const PrimaryButton = styled.span`
   height: 46px;
   background-color: ${({ theme }) => theme.yellowPrimary};
   border: 1px solid ${({ theme }) => theme.yellowPrimary};
   line-height: 48px;
   text-align: center;
   color: ${({ theme }) => theme.textBlack};
   display: block;
   width: 100%;
   transition: .2s;
   font-size: 16px;
   &:hover{
      cursor: pointer;
      background-color:  ${({ theme }) => theme.yellowHover};
      border: 1px solid ${({ theme }) => theme.yellowHover};
   }
   &:active{
      transition: 0s;
      border: 1px solid ${({ theme }) => theme.black};
   }
`;

export const GreyButton = styled(PrimaryButton)`
   background-color: ${({ theme }) => theme.white};
   border: 1px solid ${({ theme }) => theme.black};
   color: ${({ theme }) => theme.textBlack};
   &:hover{
      background-color:  ${({ theme }) => theme.grey};
      border: 1px solid ${({ theme }) => theme.black};
   }
   &:active{
      transition: 0s;
      background-color: ${({ theme }) => theme.black};
      color: ${({ theme }) => theme.white};
   }
`;



// export const PrimaryButton = props => {
//    return <PrimaryButtonStyled>{props.children}</PrimaryButtonStyled>;
// };

// export const GreyButton = props => {
//    return <GreyButtonStyled>{props.children}</GreyButtonStyled>;
// };