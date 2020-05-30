import React from 'react';

export default function SvgArrow({width}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width ? width : "15px"}
      x="0px"
      y="0px"
      viewBox="0 0 240.823 240.823"
      xmlSpace="preserve">
      <g>
        <path
          id="Chevron_Right_1_"
          d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
               l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
               C187.881,124.315,187.881,116.495,183.189,111.816z"
        />
      </g>
    </svg>
  );
}
