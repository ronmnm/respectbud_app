import styled, { css } from 'styled-components';

const additionalStylesWithBlackBorder = css`
  border: none;
  &:focus {
    border: none;
  }
`;

export const errorStyles = css`
  background-color: #ffe0db;
  border: 1px solid tomato !important;
  color: #703125;
  &:focus {
    border: 1px solid tomato;
  }

  &::placeholder {
    color: #ffb9ad;
  }
`;

const disabledStyles = css`
  pointer-events: none;
  background-color: ${({ theme }) => theme.grey};
  &::placeholder {
    color: ${({ theme }) => theme.textLightGrey};
  }
  &:hover {
    cursor: default;
  }

`;

export const inputStyles = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textBlack};
  padding-left: 15px;
  border: 1px solid ${({ theme }) => theme.darkGrey};
  &::placeholder {
    color: ${({ theme }) => theme.textLightGrey};
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
  
  ${({ disabledInput }) => (disabledInput ? disabledStyles : null)}
  ${({ type }) => (type === 'date' ? dateInputStyling : null)}
  ${({ hasError }) => (hasError ? errorStyles : null)}

`;
