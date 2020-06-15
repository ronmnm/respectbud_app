import styled, { css } from 'styled-components';
import React from 'react';
import { Svg7 } from '../../static/7';

const PrimaryButtonStyled = styled.span`
  height: ${({ height }) => (height ? height : '48px')};
  line-height: ${({ height }) => (height ? height : '48px')};
  background-color: ${({ theme }) => theme.yellowPrimary};
  border: 1px solid ${({ theme }) => theme.yellowPrimary};

  text-align: center;
  color: ${({ theme }) => theme.textBlack};
  display: block;
  width: 100%;
  transition: 0.2s;
  font-size: 16px;
  font-weight: 500;
  svg {
    stroke: ${({ theme }) => theme.darkGrey};
    height: 46px;
    width: 25px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${({ theme, loading }) => (loading ? null : theme.yellowHover)};
    border: 1px solid ${({ theme }) => theme.yellowHover};
  }
  &:active {
    transition: 0s;
    border: 1px solid ${({ theme }) => theme.black};
  }

  ${({ primaryDisable, loading }) => {
    if (primaryDisable || loading) {
      return css`
        background-color: ${({ theme }) => theme.yellowPrimaryDis};
        color: #c9c183;
        pointer-events: none;
        &:hover {
          cursor: default;
        }
      `;
    }
  }};
`;
export const PrimaryButton = props => {
  return <PrimaryButtonStyled {...props}>{props.loading ? <Svg7 /> : props.children}</PrimaryButtonStyled>;
};

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
