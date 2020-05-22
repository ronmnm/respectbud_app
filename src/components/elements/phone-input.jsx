import React, { useState } from 'react';
import { inputStyles, errorStyles } from './input';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const InputMaskStyled = styled(InputMask)`
   ${inputStyles}
   ${props => props.error ? errorStyles : null}
`;

const PhoneInput = ({value, onChange}) => {
   // const [value, setValue] = useState(null);
   const [error, setError] = useState(0);

   const handleChange = phoneNumb => {
      // setValue(phoneNumb);
      if (phoneNumb.length !== 19) {
         // setError(1);
      } else {
         // setError(0);
      }
   };
   const handleFocus =() => {
      setError(0);
   }
   return (
      <InputMaskStyled
         type='tel'
         error={error}
         mask="+38 (099) 999-99-99"
         value={value || ''}
         onChange={e => onChange(e.target.value)}
         onFocus={handleFocus}
         maskChar={null}
         placeholder="+38 (0__) ___-__-__"
      />
   );
};
export default PhoneInput;
