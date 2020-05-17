import { useRef, useState, useEffect } from "react";

export const useOutsideAlerter = (initialValue) => {
   const ref = useRef(null)
   const [visible, setVisible] = useState(initialValue)

   function handleClickOutside(event) {
      if(ref.current && !ref.current.contains(event.target)){
         setVisible(false)
      }
   }
   function handleEscapePress(keyboardEvent) {
      if(keyboardEvent.key === 'Escape'){
         setVisible(false)
      }
   }

   useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleEscapePress, true);
      return () => {
         document.removeEventListener('click', handleClickOutside, true);
         document.removeEventListener('keydown', handleEscapePress, true);
      }
   }, [ref])

   
   return { visible, setVisible, ref }
};
