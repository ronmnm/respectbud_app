import React from 'react';
import styled, { css } from 'styled-components';
import { useOutsideAlerter } from '../../hooks/outsideAlerter';
import Svg from '../../static/arrow'


const disabledStyles = css`
  pointer-events: none;
  background-color: ${({ theme }) => theme.grey};
  &:hover {
    cursor: default;
  }
  .dropdown_header {
    .dropdown_header_title {
      color: ${({ theme }) => theme.textLightGrey};
    }
  }
`;
const DropdownStyled = styled.div`
  background-color: ${({ theme }) => theme.white};
  height: 48px;
  line-height: 48px;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.textBlack};
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .dropdown_header {
    display: grid;
    grid-template-columns: 1fr 48px;
    border: 1px solid ${({ theme }) => theme.black};
    border-bottom: none;
    padding-left: 15px;
    .dropdown_header_title {
      color: ${({ theme, selectedItem }) => (selectedItem ? theme.textBlack : theme.textLightGrey)};
    }
    .svg_arrow_wrapper {
    }
  }
  .dropdown_list {
    z-index: 10;
    border: 1px solid ${({ theme }) => theme.black};
    border-top: none;
    background-color: ${({ theme }) => theme.white};
    position: relative;
    top: -2px;
    max-height: 250px;
    overflow-y: auto;
    li {
      padding-left: 15px;
      &:hover {
        background-color: ${({ theme }) => theme.lightGrey};
      }
    }
  }
  ${({ disabled }) => (disabled === null ? disabledStyles : null)};
  ${({ withBorder, borderActive }) => {
    if (withBorder) {
      if (borderActive) {
        return css`
          .dropdown_header {
            border: 1px solid ${({ theme }) => theme.black};
          }
        `;
      } else {
        return css`
          .dropdown_header {
            border: 1px solid ${({ theme }) => theme.darkGrey};
          }
        `;
      }
    }
  }};
`;

const SvgArrow = styled.div`
  ${({ theme }) => theme.textBlack};
  display: grid;
  justify-content: center;
  align-content: center;
  svg {
    fill: ${({ listOpen, theme }) => (listOpen ? theme.textBlack : theme.textGrey)};
    transform: ${props => (props.listOpen ? null : 'rotate(90deg)')};
    transition: 0.2s;
  }

  ${({ disabled }) => {
    if (disabled === null) {
      return css`
        svg {
          fill: ${({ theme }) => theme.grey};
        }
      `;
    }
  }}
`;

export function Dropdown({ list, disabled, callback, selectedItem, withBorder }) {
  const { visible, setVisible, ref } = useOutsideAlerter(false);
  const toggleList = () => setVisible(!visible);

  function selectItem(title, id, alias) {
    callback(title, id, alias);
    toggleList();
  }
  return (
    
    <DropdownStyled
      ref={ref}
      selectedItem={selectedItem}
      disabled={disabled}
      withBorder={withBorder}
      borderActive={visible}>
      <div className="dropdown_header" onClick={toggleList}>
        <div className="dropdown_header_title">{selectedItem || 'Выбрать'}</div>
        <SvgArrow listOpen={visible} disabled={disabled}>
          <Svg />
        </SvgArrow>
      </div>
      {visible && (
        <ul className="dropdown_list">
          {list.map(item => (
            <li key={item.id} onClick={() => selectItem(item.title, item.id, item.alias)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </DropdownStyled>
  );
}


