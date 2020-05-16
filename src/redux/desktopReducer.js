import * as t from './actionTypes';

const activeComponentsState = {
   currentComponent: t.MAIN_FORM,
};

function activeComponentsReducer(state = activeComponentsState, action) {
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
      key: 'Материал',
      subitem: [
         { id: 0, title: 'Песок речной' },
         { id: 1, title: 'Песок овражный' },
      ],
   },
   {
      id: 1,
      title: 'Щебень',
      selected: false,
      key: 'Материал',
      subitem: [
         { id: 0, title: 'Отсев' },
         { id: 1, title: 'Щебень 2-5' },
         { id: 2, title: 'Щебень 5-10' },
         { id: 3, title: 'Щебень 5-20' },
         { id: 4, title: 'Щебень 10-20' },
         { id: 5, title: 'Щебень 20-40' },
         { id: 6, title: 'Щебень 40-70' },
         { id: 7, title: 'ЩПС 0-40' },
         { id: 8, title: 'ЩПС 0-70' },
      ],
   },
   {
      id: 2,
      title: 'Подсыпка',
      selected: false,
      key: 'Материал',
      subitem: [
         { id: 0, title: 'Супесь', key: 'Материал' },
         { id: 1, title: 'Суглинок', key: 'Материал' },
      ],
   },
   {
      id: 3,
      title: 'Керамзит',
      selected: false,
      key: 'Материал',
      subitem: [
         { id: 0, title: '5-10' },
         { id: 1, title: '10-20' },
      ],
   },
];

const materialSelectionState = {
   materialTitle: null,
   materialsList: materialsList,

   materialTypeTitle: null,
   materialsTypeList: null,
};

export function materialSelectionReducer(state = materialSelectionState, action) {
   switch (action.type) {
      case t.SET_MATERIAL:
         return {
            ...state,
            materialTitle: action.payload,
            materialsTypeList: materialsList[action.id].subitem,
            materialTypeTitle: null,
         };
      case t.SET_MATERIAL_TYPE:
         return { ...state, materialTypeTitle: state.materialsTypeList[action.id].title };

      default:
         return state;
   }
}

export default activeComponentsReducer;
