import styled, { css } from 'styled-components';

const additionalStylesWithBlackBorder = css`
   border: none;
   &:focus {
      border: none;
   }
`;

export const errorStyles = css`
   background-color: #fff2f2;
   border: 1px solid tomato;
`;

const disabledStyles = css`
   pointer-events: none;
   background-color: ${({ theme }) => theme.grey};
   &::placeholder{
      color: ${({ theme }) => theme.textLightGrey};
   }
   &:hover {
      cursor: default;
   }
`;

export const inputStyles = css`
   height: 47px;
   width: 100%;
   background-color: ${({ theme }) => theme.white};
   font-size: 16px;
   font-weight: 500;
   color: ${({ theme }) => theme.textBlack};
   padding-left: 15px;
   -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
   -moz-box-sizing: border-box; /* Firefox, other Gecko */
   box-sizing: border-box;
   border: 1px solid ${({ theme }) => theme.darkGrey};
   &::placeholder {
      color: ${({ theme }) => theme.textGrey};
   }
   &:focus {
      outline: none;
      transition: 0.2s;
      border: 1px solid ${({ theme }) => theme.black};
   }
   &:focus::placeholder {
      opacity: 0;
   }
   border: 1px solid ${({ theme }) => theme.darkGrey};
   &:focus {
      border: 1px solid ${({ theme }) => theme.black};
   }
`;

const dateInputStyling = css`
   color: red;
   font-family: 'Roboto', sans-serif;
`;

export const InputStyled = styled.input`
   ${inputStyles}
   ${({ border }) => (border ? null : additionalStylesWithBlackBorder)}
   ${({ hasError }) => (hasError ? errorStyles : null)}
   ${({ disabledInput }) => (disabledInput ? disabledStyles : null)}
   ${({ type }) => (type === 'date' ? dateInputStyling : null)}

`;
