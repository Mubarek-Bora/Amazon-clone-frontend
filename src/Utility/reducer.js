
import { useReducer } from "react"
import { Type } from "./action.type"
export const initialState={
    basket:[],
    user:null
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      // Check if the item exists
      // eslint-disable-next-line no-case-declarations
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    case Type.REMOVE_FROM_BASKET:
      // eslint-disable-next-line no-case-declarations
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1); // Remove item from basket if amount is 1
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
       case Type.EMPTY_BASKET:
        return {
          ...state,
          basket:[],
        };

      case Type.SET_USER:
        return{
          ...state,
          user:action.user
        };



    default:
      return state;
  }
};








































// export const reducer = (state,action) => {
//   switch (action.type) {
//     case "ADD_TO_BASKET":
//       // check if the item exists 
//        const existingItems =state.basket.find(items)=>item.id===action.item.id)
//        if(!existingItems){
//         return{
//             ...state,
//             basket:[...state.basket,{...action.item,amount:1}]

//         }
//        } else{ 
//         const updateBasket=state.basket.map((item)=>{
//             item.id===action.item.id? {...item,amount:item.amount+1} :item
//         })
//         return{
//             ...state,
//             basket:updateBasket
//         }
       
//     default:
//       return state;
//   }
// };
