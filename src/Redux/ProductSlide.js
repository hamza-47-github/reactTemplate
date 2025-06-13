import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: null,
  cartItem: [],
  cartMenuList:null,
  categoriesList:null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
      setitemCounte: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        // toast("Already Item in Cart");
      } else {
        // toast("Item Add successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
    //   toast("one Item Delete");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = ++qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
    setCartMenuList: (state, action) => {
      state.cartMenuList = [...action.payload];
    },
    setCategoriesList: (state, action) => {
      state.categoriesList = [...action.payload];
    },
    resetCategoriesList: (state) => {
      state.categoriesList = []; 
      state.cartMenuList=[]
    },
  },
});

export const {
  setitemCounte,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  setCartMenuList,
  setCategoriesList,
  resetCategoriesList
} = ProductSlice.actions;

export default ProductSlice.reducer;
