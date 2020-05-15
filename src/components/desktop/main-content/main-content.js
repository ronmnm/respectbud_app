import React, { useState } from 'react';
import MainSection from './main-section/main-section';

const MainContent = () => {
   const [currentComponent] = useState('main_section');
   switch (currentComponent) {
      case 'main_section':
         return <MainSection />
      case 'order_section':
         return <div>order section comp</div>;
      case 'result_section':
         return <div>result section comp</div>;
      default:
         return <MainSection />;
   }
};

export default MainContent