import React from 'react';
import styled from 'styled-components';
import logo from '../../static/logo.png';
import { Svg7 } from '../../static/7';

const HeaderStyled = styled.div`
  /* display: grid; */
  /* grid-template-rows: minmax(50px, 30vh); */
  height: 10vh;
  min-height: 50px;
  max-height: 130px;
  .header_wrapper {
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-auto-flow: column;
    max-width: ${({ theme }) => theme.mainWidth};
    height: 100%;
    margin: 0 auto;
    padding: 0 50px;
  }
`;
const LogoHeader = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  img {
    height: 60%;
  }
`;
const PhonesHeader = styled.div`
  height: 50px;
  grid-auto-flow: column;
  display: grid;
  align-items: center;
  svg {
    margin-right: 9px;
    height: 15px;
    width: 15px;
  }
  div {
    font-size: 16px;
    letter-spacing: 0.2px;
    font-weight: 400;

    a {
      color: ${({ theme }) => theme.textGrey};
      transition: 0.2s;
      &:hover {
        color: ${({ theme }) => theme.yellowHover};
        cursor: pointer;
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyled>
      <div className="header_wrapper">
        <LogoHeader>
          <img src={logo} alt="" />
        </LogoHeader>
        <PhonesHeader>
          <Svg7 phoneIcon />
          <div>
            <a href="tel:+380957061098">0957061098 /</a>
            <a href="tel:+380957061098"> 0637080785</a>
          </div>
        </PhonesHeader>
      </div>
    </HeaderStyled>
  );
};

export default Header;
