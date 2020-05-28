import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import { connect } from 'react-redux';
import * as t from '../../../../../redux/actionTypes';

import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const googleKey = 'AIzaSyCCp4PAFzaCMIY47nyPLZFMfPTlsEp_NUY';
const mapBoxToken = 'pk.eyJ1Ijoicm9tYXVhIiwiYSI6ImNpbXE3MXcwazAwMWF2cG0xanI0cTFvaTYifQ.zbbHBc9O2okw2n6fmuRFsg';
const attributionString = 'Map data &copy; OpenStreetMap, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

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
`;
// const MapComponentStyled = styled.div`
//   height: 100%;
//   .map {
//     height: 100%;
//   }
// `;

// function MapComponent({ selectedCoordinates }) {
//   const markerLat = selectedCoordinates.lat;
//   const markerLng = selectedCoordinates.lng;

//   const mapRef = useRef(null);

//   function onMapClick(e) {
//     // setMarkerLat(e.latlng.lat);
//     // setMarkerLng(e.latlng.lng);
//     console.log(e.latlng.lat, e.latlng.lng);
//   }

//   useEffect(() => {
//     mapRef.current = L.map('mapid').setView([50.44941, 30.524184], 11);

//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//       attribution: attributionString,
//       maxZoom: 18,
//       id: 'mapbox/streets-v11',
//       tileSize: 512,
//       zoomOffset: -1,
//       accessToken: mapBoxToken,
//     }).addTo(mapRef.current);

//     mapRef.current.on('click', onMapClick);
//   }, []);

//   // add marker
//   const markerRef = useRef(null);
//   useEffect(() => {
//     if (markerRef.current) {
//       markerRef.current.setLatLng([markerLat, markerLng]);
//     } else {
//       markerRef.current = L.marker([markerLat, markerLng]).addTo(mapRef.current);
//     }
//   }, [markerLat, markerLng]);

//   return (
//     <MapComponentStyled>
//       <div className="map" id="mapid" />
//     </MapComponentStyled>
//   );
// }

// function MapContainer() {
//   return (
//     <MapStyed>
//       <div className="map_wrapper">
//         <span>Вы можете ввести адрес, поставив точку на карте</span>
//         <MapComponent />
//       </div>
//     </MapStyed>
//   );
// }

function Map({ selectedCoordinates, dispatch }) {
  const defaultCenterCoords = { lat: 50.44941, lng: 30.524184 };

  function handleOnMapClick(e) {
    let latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    dispatch({ type: t.SET_COORDINATES, payload: latlng });

    let geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status == 'OK') {
        dispatch({ type: t.SET_CUSTOMER_ADDRESS, payload: results[0].formatted_address });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  const map = useRef();

  useEffect(() => {
    if (selectedCoordinates) {
      map.current.panTo({ lat: selectedCoordinates.lat, lng: selectedCoordinates.lng });
    }
  }, [selectedCoordinates]);

  return (
    <GoogleMap
      ref={map}
      defaultZoom={10}
      defaultOptions={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: 'greedy',
      }}
      onClick={handleOnMapClick}
      defaultCenter={defaultCenterCoords}>
      <Marker position={selectedCoordinates} />
    </GoogleMap>
  );
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
  );
}

const mapStateToProps = ({ globalData }) => ({
  selectedCoordinates: globalData.selectedCoordinates,
});
const MapWrapped = withGoogleMap(connect(mapStateToProps)(Map));
