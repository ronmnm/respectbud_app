import React from 'react';

export const Svg7 = ({ loader, phoneIcon, calendarIcon }) => {
   if (phoneIcon) {
      return (
         <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M16.9235 13.5512L16.8389 13.2963C16.6385 12.7006 15.9816 12.0794 15.3782 11.9157L13.1447 11.3056C12.5391 11.1408 11.6751 11.3623 11.2319 11.8054L10.4236 12.6138C7.48601 11.82 5.18246 9.51636 4.38974 6.57932L5.1981 5.77096C5.64124 5.32782 5.86277 4.46499 5.698 3.85932L5.08897 1.62478C4.9242 1.02021 4.30182 0.363343 3.70729 0.165146L3.45234 0.0794254C2.85668 -0.118772 2.00717 0.0816699 1.56407 0.524772L0.354936 1.73501C0.138925 1.94988 0.000867608 2.56446 0.000867608 2.56671C-0.0414225 6.4056 1.46385 10.1042 4.17933 12.8197C6.88814 15.5285 10.5729 17.0316 14.4006 16.9993C14.4206 16.9993 15.053 16.8635 15.269 16.6485L16.4782 15.4394C16.9213 14.9963 17.1217 14.1469 16.9235 13.5512Z"
               fill="black"
               fillOpacity="0.87"
            />
         </svg>
      );
   }
   if (calendarIcon) {
      return (
         <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M13 0V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13ZM16 18H2V7H16V18Z"
               fill="black"
               fillOpacity="0.6"
            />
         </svg>
      );
   }
   return (
      <svg width="18" height="18" viewBox="-2 -2 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
         <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="5">
               <circle strokeOpacity=".35" cx="18" cy="18" r="18" />
               <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                     attributeName="transform"
                     type="rotate"
                     from="0 18 18"
                     to="360 18 18"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>
            </g>
         </g>
      </svg>
   );
};
