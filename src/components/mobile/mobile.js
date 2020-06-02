import React, {useEffect} from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import AnketaPage from './pages/01-anketa';
import VyborTovaraPage from './pages/02-vybor-tovara';
import CalculationVolumePage from './pages/03-calculation';
import MapPage from './pages/04-map';
import PaymentMethod from './pages/05_payment-method';
import ResultPage from './pages/06_result';
import OrderPage from './pages/07_order';
import FinalPage from './pages/08-final';

export const history = createBrowserHistory();

export default function Mobile() {
  useEffect(() => {
    history.push('/')
  }, [])

  return (
    <Router history={history}>
        <Route exact path="/" render={() => <AnketaPage />}></Route>
        <Route path="/material" render={() => <VyborTovaraPage />}></Route>
        <Route path="/calculations" render={() => <CalculationVolumePage />}></Route>
        <Route path="/map" render={() => <MapPage />}></Route>
        <Route path="/payment-method" render={() => <PaymentMethod />}></Route>
        <Route path="/result" render={() => <ResultPage />}></Route>
        <Route path="/order" render={() => <OrderPage />}></Route>
        <Route path="/final-page" render={() => <FinalPage />}></Route>
    </Router>
  );
}
