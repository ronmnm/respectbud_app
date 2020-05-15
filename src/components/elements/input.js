import styled, { css } from 'styled-components';

const additionalStyles = css`
   border: 1px solid ${({ theme }) => theme.darkGrey};
   &:focus {
      border: 1px solid ${({ theme }) => theme.black};
   }
`;

export const InputStyled = styled.input`
   height: 48px;
   width: 100%;
   border: none;
   background-color: ${({ theme }) => theme.white};
   font-size: 16px;
   color: ${({ theme }) => theme.textBlack};
   padding-left: 15px;
   -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
   -moz-box-sizing: border-box; /* Firefox, other Gecko */
   box-sizing: border-box;
   &::placeholder {
      color: ${({ theme }) => theme.textGrey};
   }
   &:focus {
      outline: none;
      transition: .2s;
   }
   &:focus::placeholder {
      opacity: 0;
   }
   ${(props) => props.border ? additionalStyles : null}
`;
