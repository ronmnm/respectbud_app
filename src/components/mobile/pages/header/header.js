import React from 'react';
import styled from 'styled-components';
import logo from '../../../../static/logo.png';
import { NavLink } from 'react-router-dom';

const HeaderStyled = styled.div`
  /* display: grid; */
  /* justify-content: center; */
  /* align-items: center; */
  /* height: 13vh; */
  .back_button {
    position: absolute;
    border: 1px solid ${({ theme }) => theme.textGrey};
    height: 6vh;
    width: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #f6f6f6; */
    border: none;
    /* margin-left: 10px; */
    svg {
      fill: ${({ theme }) => theme.darkGrey};
      height: 2vh;
    }
  }
  position: relative;
  img {
    height: 6vh;
    margin: 0 auto;
    display: block;
  }
`;
const TitleStyled = styled.h3`
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
  font-size: 1.1rem;
  margin-top: 4vh;
  margin-bottom: 2vh;
`;

function MobileHeader({ title, withButton, navLinkTo }) {
  return (
    <HeaderStyled>
      {withButton && (
        <NavLink to={`/${navLinkTo}`}>
          <div className="back_button">
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="13.001" width="36" height="2" rx="1" />
              <rect y="13.457" width="19.031" height="2" rx="1" transform="rotate(-45 0 13.457)" />
              <rect x="1.41406" y="13.001" width="19.031" height="2" rx="1" transform="rotate(45 1.41406 13.001)" />
            </svg>
          </div>
        </NavLink>
      )}
      <img src={logo} alt="" />

      <TitleStyled>{title}</TitleStyled>
    </HeaderStyled>
  );
}
export default MobileHeader;
