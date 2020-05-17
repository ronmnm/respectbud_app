import React from 'react';
import styled, { keyframes } from 'styled-components';

import ReactDOM from 'react-dom';

const ModalWrapper = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 99;
   /* display: grid; */
   /* justify-content: center; */
   /* align-items: center; */
`;
const fadeIn = keyframes`
   0% {opacity:0;}
   100% {opacity:1;}
`;
const ModalBackdrop = styled.div`
   animation: 0.2s ${fadeIn} ease;
   position: fixed;
   height: 100%;
   width: 100%;
   z-index: 100;
   background-color: rgba(0, 0, 0, 0.3);
`;
const ModalWindow = styled.div`
   position: relative;
   top: 46%;
   left: 50%;
   transform: translate(-50%, -50%);
   margin-bottom: 40px;
   height: 75vh;
   max-height: 590px;
   width: 100vw;
   max-width: 450px;
   background-color: ${({ theme }) => theme.white};
   z-index: 101;
`;

function Modal({ children, isModalOpen }) {

   if (isModalOpen) {
      return ReactDOM.createPortal(
         <ModalWrapper>
            <ModalBackdrop />
            <ModalWindow>{children}</ModalWindow>
         </ModalWrapper>,

         document.getElementById('modal_root')
      );
   } else {
      return null;
   }
}
export default Modal;
