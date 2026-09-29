import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isCartOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
       toggleCart:(state)=>{
        state.isCartOpen = !state.isCartOpen;
      },
      openCart: (state) => {
        state.isCartOpen = true;
      },
      closeCart:(state) => {
        state.isCartOpen = false ;
      },
    
  },
});



export const {
   toggleMobileMenu,
    closeMobileMenu ,
    toggleCart,
  openCart,
  closeCart,
} = uiSlice.actions;

export default uiSlice.reducer;