import React from "react"
import styled, { css } from "styled-components"
import { inputStyles } from "../../../../elements/input"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import * as t from "../../../../../redux/actionTypes"

const InputAutocompleteStyled = styled.input`
  ${inputStyles};
  position: relative;
  z-index: 3;
`
const InputAutocompleteWrapperStyled = styled.div`
  position: relative;
  .list {
    background-color: ${({ theme }) => theme.white};
    position: absolute;
    width: 100%;
    top: 46px;
    ${({ isListVisible }) => {
      if (isListVisible) {
        return css`
          z-index: 4;
          border-left: 1px solid ${({ theme }) => theme.black};
          border-right: 1px solid ${({ theme }) => theme.black};
          border-bottom: 1px solid ${({ theme }) => theme.black};
        `
      } else {
        return css`
          z-index: 2;
          border: none;
        `
      }
    }}
    .item {
      padding: 10px 15px;
      font-size: 16px;
      color: ${({ theme }) => theme.textGrey};
      font-weight: 400;
      b {
        color: ${({ theme }) => theme.textBlack};
        font-weight: 500;
      }
      &:hover {
        background-color: ${({ theme }) => theme.lightGrey};
        cursor: pointer;
      }
    }
  }
`

export default function InputPlaces({ dispatch, address }) {
  async function handleSelect(value) {
    dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: value })
    const coords = await geocodeByAddress(value)
    const res = await getLatLng(coords[0])
    dispatch({ type: t.SET_COORDINATES, payload: res })
  }

  function handleChange(value) {
    dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: value })
  }

  const searchOptions = {
    location: new window.google.maps.LatLng(50.44941, 30.524184),
    radius: 300000,
    // types: ["address"],
    componentRestrictions: { country: ["ukr"] },
  }

  return (
    <PlacesAutocomplete
      value={address || ""}
      onChange={value => handleChange(value)}
      onSelect={handleSelect}
      searchOptions={searchOptions}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <InputAutocompleteWrapperStyled isListVisible={suggestions.length > 0}>
          <InputAutocompleteStyled border placeholder="Введите название улицы" {...getInputProps()} />
          <div className="list">
            {suggestions.map(item => {
              return (
                <div {...getSuggestionItemProps(item)} className="item" key={item.id}>
                  <b>{item.terms[0] ? item.terms[0].value : null}</b>{' '}
                  {item.terms[1] ? item.terms[1].value : null}
                </div>
              )
            })}
          </div>
        </InputAutocompleteWrapperStyled>
      )}
    </PlacesAutocomplete>
  )
}
