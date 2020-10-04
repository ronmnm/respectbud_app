import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import * as t from "../../../../../redux/actionTypes"

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const googleKey = "AIzaSyCCp4PAFzaCMIY47nyPLZFMfPTlsEp_NUY"

const MapStyed = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  .map_wrapper {
    display: grid;
    grid-template-rows: 30px 1fr;
    margin: 30px 0;
    span {
      color: ${({ theme }) => theme.textGrey};
    }
  }
`

function Map({ selectedCoordinates, dispatch }) {
  const map = useRef()
  const defaultCenterCoords = { lat: 49.983470, lng: 36.263844 }
  function handleOnMapClick(e) {
    let latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    
    dispatch({ type: t.SET_COORDINATES, payload: latlng })

    let geocoder = new window.google.maps.Geocoder()

    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === "OK") {
        dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: results[0].formatted_address })
      } else {
        console.log("Geocode was not successful for the following reason: " + status)
      }
    })
  }


  useEffect(() => {
    if (selectedCoordinates) {
      map.current.panTo({ lat: selectedCoordinates.lat, lng: selectedCoordinates.lng })
    }
  }, [selectedCoordinates])

  return (
    <GoogleMap
      ref={map}
      defaultZoom={10}
      defaultOptions={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
      }}
      onClick={handleOnMapClick}
      defaultCenter={defaultCenterCoords}>
      <Marker position={selectedCoordinates} />
    </GoogleMap>
  )
}

export default function GoogleMapsComponent() {
  return (
    <MapStyed>
      <div className="map_wrapper">
        <span>Вы можете ввести адрес, поставив точку на карте</span>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleKey}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}></MapWrapped>
      </div>
    </MapStyed>
  )
}

const mapStateToProps = ({ globalData }) => ({
  selectedCoordinates: globalData.selectedCoordinates,
})
const MapWrapped = withGoogleMap(connect(mapStateToProps)(Map))
