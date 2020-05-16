import styled, { css } from 'styled-components';

export const additionalStylesWithBorder = css`
   border: 1px solid ${({ theme }) => theme.darkGrey};
   &:focus {
      border: 1px solid ${({ theme }) => theme.black};
   }
`;

export const inputStyles = css`
   height: 48px;
   width: 100%;
   border: none;
   background-color: ${({ theme }) => theme.white};
   font-size: 16px;
   font-weight: 600;
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
      transition: 0.2s;
   }
   &:focus::placeholder {
      opacity: 0;
   }
`;

export const errorStyles = css`
   background-color: #fff2f2;
   border: 1px solid tomato;
`;

export const InputStyled = styled.input`
   ${inputStyles}
   ${props => (props.border ? additionalStylesWithBorder : null)}
   ${props => props.hasError ? errorStyles : null}
`;
