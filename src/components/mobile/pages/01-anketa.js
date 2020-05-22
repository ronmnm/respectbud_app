import React from 'react';
import styled from 'styled-components';
import MobileHeader from './header/header';
import { InputStyled } from '../../elements/input';
import PhoneInput from '../../elements/phone-input';
import { PrimaryButton } from '../../elements/buttons';
import { connect } from 'react-redux';
import * as t from '../../../redux/actionTypes';
import { setUserToLocalStorage } from '../../../utils/utils';

// firebase
import { firestore } from '../../../firebase';

export const AnketaPageStyled = styled.div`
   height: 100%;
   display: grid;
   grid-template-rows: min-content 1fr min-content;
   align-items: center;
   padding: 6vh 30px 10vh 30px;

   .input_field_wrapper {
      margin-bottom: 20px;
      position: relative;
   }
`;

export const LabelStyled = styled.span`
   display: inline-block;
   margin-bottom: 5px;
   margin-left: 15px;
   font-size: 1rem;
   font-weight: 400;
   color: ${({ theme }) => theme.textGrey};
`;

function AnketaPage({ customerName, customerPhone, customerOrganization, dispatch }) {
   async function handleNextClick() {
      setUserToLocalStorage(customerName, customerPhone);

      const dataObj = {
         customerName,
         customerPhone,
      };
      dispatch({ type: t.SET_CURRENT_MOBILE_COMPONENT, payload: t.VYBOR_TOVARA_PAGE });
      const docRef = await firestore
         .collection('users-test')
         .doc(`${customerName} - ${customerPhone.substr(3)}`)
         .set(
            {
               customerName: customerName,
               customerPhone: customerPhone,
               customerOrganization: customerOrganization,
               platform: navigator.platform,
               timestamp: new Date().toLocaleString(),
               
            },
            { merge: true }
         );
      console.log(docRef);
      // const document = await docRef.get();
   }

   return (
      <AnketaPageStyled>
         <MobileHeader title="Анкета" />
         <div>
            <div className="input_field_wrapper">
               <LabelStyled>* Ваше имя</LabelStyled>
               <InputStyled
                  value={customerName || ''}
                  onChange={e => dispatch({ type: t.SET_CUSTOMER_NAME, payload: e.target.value })}
                  placeholder="Илюша"
                  border
               />
            </div>
            <div className="input_field_wrapper">
               <LabelStyled>Название организации</LabelStyled>
               <InputStyled
                  onChange={e => dispatch({ type: t.SET_CUSTOMER_ORGANIZATION, payload: e.target.value })}
                  value={customerOrganization || ''}
                  placeholder="ТОВ"
                  border
               />
            </div>
            <div className="input_field_wrapper">
               <LabelStyled>* Номер телефона</LabelStyled>
               <PhoneInput
                  border
                  value={customerPhone || ''}
                  onChange={value => dispatch({ type: t.SET_CUSTOMER_PHONE, payload: value })}
               />
            </div>
         </div>
         <div>
            <PrimaryButton
               // primaryDisable={customerName || customerPhone.length === 19}
               onClick={handleNextClick}>
               Далее
            </PrimaryButton>
         </div>
      </AnketaPageStyled>
   );
}
const mapStateToProps = ({ firstPage }) => ({
   customerName: firstPage.customerName,
   customerPhone: firstPage.customerPhone,
   customerOrganization: firstPage.customerOrganization,
});
export default connect(mapStateToProps)(AnketaPage);