import React from 'react';
import styled from 'styled-components';

const MapStyed = styled.div`
  /* background-color: lightskyblue; */
  width: 100%;
  height: 100%;
  display: grid;
  .map_wrapper {
    display: grid;
    grid-template-rows: 30px 1fr;
    margin: 30px 0;
    /* background-color: lightgreen; */

    .map {
      /* background-color: lightpink; */
    }
  }
`;

const MapSection = () => {
  return (
    <MapStyed>
      <div className="map_wrapper">
        <span>Вы можете ввести адрес, поставив точку на карте</span>
        <div className="map">map</div>
      </div>
    </MapStyed>
  );
};
export default MapSection;
