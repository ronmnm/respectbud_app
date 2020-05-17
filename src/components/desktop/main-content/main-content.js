import React from 'react';
import MainSection from './main-section/main-section';
import { connect } from 'react-redux';
import * as t from '../../../redux/actionTypes';
import ResultPage from './result-section/result-page';
import OrderPage from './order-section/order-page';

const MainContent = ({ currentComponent }) => {
   switch (currentComponent) {
      case t.MAIN_FORM:
         return <MainSection/>;

      case t.RESULT_PAGE:
         return <ResultPage />

      case t.ORDER_PAGE:
         return <OrderPage />

      default:
         return <MainSection />;
   }
};

const mapStateToProps = ({ desktop }) => ({
   currentComponent: desktop.currentComponent,
});
export default connect(mapStateToProps)(MainContent);
