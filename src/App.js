import React, { useEffect } from 'react';
import Desktop from './components/desktop/desktop';
import Mobile from './components/mobile/mobile';
import * as t from './redux/actionTypes';

import { firestore } from './services/firebase';
import { connect } from 'react-redux';

function App({ dispatch }) {
  const isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

  function checkIfLoggedIn() {
    const storage = JSON.parse(localStorage.getItem('customerData'));
    if (storage) {
      dispatch({ type: t.SET_CUSTOMER_NAME, payload: storage.name });
      dispatch({ type: t.SET_CUSTOMER_PHONE, payload: storage.phone });
      dispatch({ type: t.SET_CUSTOMER_ORGANIZATION, payload: storage.organization });
    }
  }

  useEffect(() => {
    checkIfLoggedIn();

    // (function fetchData() {
    //   let snapshot = firestore.collection('suppliers').get();
    //   const res = snapshot.then(snapshot => {
    //       return snapshot.forEach(doc => {
    //         // console.log(doc.data());
    //       });
    //     });
      
    // })();
  });

  if (isMobile) return <Mobile />;
  return <Desktop />;
}

export default connect()(App);
