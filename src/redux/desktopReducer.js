import * as t from './actionTypes';

const activeComponentsState = {
  currentComponent: t.MAIN_FORM,
};

export function activeComponentsReducer(state = activeComponentsState, action) {
  switch (action.type) {
    case t.SET_CURRENT_COMPONENT:
      return { ...state, currentComponent: action.payload };
    default:
      return state;
  }
}

const materialsList = [
  {
    id: 0,
    title: 'Песок',
    selected: false,
    subitem: [
      { id: 0, meter3: 1.6, oneTon: 0.625, title: 'Песок речной' },
      { id: 1, meter3: 1.6, oneTon: 0.625, title: 'Песок овражный' },
    ],
  },
  {
    id: 1,
    title: 'Щебень',
    selected: false,
    subitem: [
      { id: 0, meter3: 1.4, oneTon: 0.714, title: 'Отсев' },
      { id: 1, meter3: 1.4, oneTon: 0.714, title: 'Щебень 2-5' },
      { id: 2, meter3: 1.4, oneTon: 0.714, title: 'Щебень 5-10' },
      { id: 3, meter3: 1.4, oneTon: 0.714, title: 'Щебень 5-20' },
      { id: 4, meter3: 1.4, oneTon: 0.714, title: 'Щебень 10-20' },
      { id: 5, meter3: 1.4, oneTon: 0.714, title: 'Щебень 20-40' },
      { id: 6, meter3: 1.4, oneTon: 0.714, title: 'Щебень 40-70' },
      { id: 7, meter3: 1.4, oneTon: 0.714, title: 'ЩПС 0-40' },
      { id: 8, meter3: 1.4, oneTon: 0.714, title: 'ЩПС 0-70' },
    ],
  },
  {
    id: 2,
    title: 'Подсыпка',
    selected: false,
    subitem: [
      { id: 0, meter3: 1.6, oneTon: 0.625, title: 'Супесь' },
      { id: 1, meter3: 1.6, oneTon: 0.625, title: 'Суглинок' },
    ],
  },
  {
    id: 3,
    title: 'Керамзит',
    selected: false,
    subitem: [
      { id: 0, meter3: 0.6, oneTon: 1.666, title: 'Керамзит 5-10' },
      { id: 1, meter3: 0.6, oneTon: 1.666, title: 'Керамзит 10-20' },
    ],
  },
];

const materialSelectionState = {
  materialTitle: null,
  materialsList: materialsList,

  materialTypeTitle: 'Песок речной',
  materialType: null,
  materialsTypeList: null,

  oneTonInM3: null,
  m3InTon: null,

  materialWeight: 9,
  materialVolume: null,

  customerName: null,
  customerOrganization: null,
  customerPhone: 0,
  customerPaymentMethod: 'Наличный расчет',
  paymentMethodAlias: 'nal',
  customerAddress: null,
};

export function firstPageReducer(state = materialSelectionState, action) {
  switch (action.type) {
    case t.SET_MATERIAL:
      return {
        ...state,
        materialTitle: action.payload,
        materialsTypeList: materialsList[action.id].subitem,
        materialTypeTitle: null,
        materialWeight: null,
        materialVolume: null,
      };
    case t.SET_MATERIAL_TYPE:
      return {
        ...state,
        materialTypeTitle: state.materialsTypeList[action.id].title,
        oneTonInM3: state.materialsTypeList[action.id].oneTon,
        m3InTon: state.materialsTypeList[action.id].meter3,
        materialWeight: null,
        materialVolume: null,
      };

    case t.SET_MATERIAL_WEIGHT:
      const newVolume = (action.payload * state.oneTonInM3).toFixed(3);
      return { ...state, materialWeight: action.payload, materialVolume: newVolume };

    case t.SET_MATERIAL_VOLUME:
      const newWeight = Math.ceil(action.payload * state.m3InTon);
      return { ...state, materialVolume: action.payload, materialWeight: newWeight };

    case t.SET_CUSTOMER_NAME:
      return { ...state, customerName: action.payload };
    case t.SET_CUSTOMER_ORGANIZATION:
      return { ...state, customerOrganization: action.payload };
    case t.SET_CUSTOMER_PHONE:
      return { ...state, customerPhone: action.payload };
    case t.SET_CUSTOMER_PAYMENT_METHOD:
      return { ...state, customerPaymentMethod: action.payload, paymentMethodAlias: action.alias };
    case t.SET_CUSTOMER_ADDRESS:
      return { ...state, customerAddress: action.payload };
    default:
      return state;
  }
}

const orderPageInitialState = {
  deliveryDate: null,
  deliveryDateHuman: null,
  deliveryTime: null,
  phoneOnUnloading: 0,
  orderComment: null,
};

export const orderDataReducer = (state = orderPageInitialState, action) => {
  switch (action.type) {
    case t.SET_DELIVERY_DATE:
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return {
        ...state,
        deliveryDate: action.payload,
        deliveryDateHuman: action.payload.toLocaleString('ru-RU', options),
      };
    case t.SET_DELIVERY_TIME:
      return { ...state, deliveryTime: action.payload };
    case t.SET_PHONE_ON_UNLOADING:
      return { ...state, phoneOnUnloading: action.payload };
    case t.SET_ORDER_COMMENT:
      return { ...state, orderComment: action.payload };
    default:
      return state;
  }
};

// const
// export function customerReducer(state = customerInitialState, action) {
//    switch (action.type) {
//       default:
//          return state;
//    }
// }
