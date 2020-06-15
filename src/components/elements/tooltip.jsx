import React, { useState } from "react"
import styled from "styled-components"

const TooltipStyled = styled.span`
  position: relative;
  span {
    position: absolute;
    bottom: 15px;
    left: -50px;
    padding: 10px 14px;
    line-height: 15px;
    background-color: white;
    width: 190px;
    border: 1px solid #ccc;
    color: ${({ theme }) => theme.textBlack};
    border-radius: 5px;
    font-size: 11px;
    z-index: 12;
    text-align: center;
    box-shadow: 0 2px 10px rgb(0, 0, 0, 0.2);
    &:after {
      content: "";
      position: absolute;
      background-color: white;
      left: 48px;
      bottom: -8px;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      height: 14px;
      width: 14px;
      transform: rotate(45deg);
      z-index: -1;
    }
  }
  svg {
    position: absolute;
    &:hover {
      cursor: pointer;
    }
  }
`

function Tooltip({ text, onError }) {
  let [isVisible, setIsVisible] = useState(false)
  return (
    <TooltipStyled>
      <svg
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="7" fill="#E8E8E8" />
        <path d="M7 3.5V8.5" stroke="#1C1C1C" />
        <path d="M7 11V10" stroke="#1C1C1C" />
      </svg>
      {(isVisible || onError) && <span>{text}</span>}
    </TooltipStyled>
  )
}

export default React.memo(Tooltip)
