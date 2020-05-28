import React, {useEffect} from 'react';
// import styled from 'styled-components';
// import * as t from '../../redux/actionTypes';
import { createBrowserHistory } from 'history';

import { Router, Route, Redirect } from 'react-router-dom';

import AnketaPage from './pages/01-anketa';
import VyborTovaraPage from './pages/02-vybor-tovara';
import CalculationVolumePage from './pages/03-calculation';
import MapPage from './pages/04-map';
import PaymentMethod from './pages/05_payment-method';
import ResultPage from './pages/06_result';
import OrderPage from './pages/07_order';
import FinalPage from './pages/08-final';

// import { connect } from 'react-redux';

export const history = createBrowserHistory();

// const MobileStyled = styled.div`
//   height: 100vh;
// `;

export default function Mobile() {
  // let currentPage;
  // switch (component) {
  //   case t.ANKETA_PAGE:
  //     currentPage = <AnketaPage />;
  //     break;
  //   case t.VYBOR_TOVARA_PAGE:
  //     currentPage = <VyborTovaraPage />;
  //     break;
  //   case t.CALCULATOR_PAGE:
  //     currentPage = <CalculationVolumePage />;
  //     break;
  //   case t.MAP_PAGE:
  //     currentPage = <MapPage />;
  //     break;
  //   case t.PAYMENT_METHOD_PAGE:
  //     currentPage = <PaymentMethod />;
  //     break;
  //   case t.RESULT_MOBILE_PAGE:
  //     currentPage = <ResultPage />;
  //     break;
  //   case t.ORDER_MOBILE_PAGE:
  //     currentPage = <OrderPage />;
  //     break;
  //   case t.FINAL_PAGE:
  //     currentPage = <FinalPage />;
  //     break;
  //   default:
  //     currentPage = <AnketaPage />;
  // }

  useEffect(() => {
    history.push('/')
  }, [])

  return (
    // <MobileStyled>{currentPage}</MobileStyled>;
    <Router history={history}>
      {/* <MobileStyled> */}
        <Route exact path="/" render={() => <AnketaPage />}></Route>
        <Route path="/material" render={() => <VyborTovaraPage />}></Route>
        <Route path="/calculations" render={() => <CalculationVolumePage />}></Route>
        <Route path="/map" render={() => <MapPage />}></Route>
        <Route path="/payment-method" render={() => <PaymentMethod />}></Route>
        <Route path="/result" render={() => <ResultPage />}></Route>
        <Route path="/order" render={() => <OrderPage />}></Route>
        <Route path="/final-page" render={() => <FinalPage />}></Route>
      {/* </MobileStyled> */}
    </Router>
  );
}

// const mapStateToProps = ({ mobile }) => ({
//   component: mobile.component,
// });
// export default connect(mapStateToProps)(Mobile);
