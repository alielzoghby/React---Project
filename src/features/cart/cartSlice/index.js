import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, fetchHandlers } from "./actions/fetchCart";
import {
  deleteCartProduct,
  deleteProductHandlers,
} from "./actions/deleteCartProduct";
import {
  incrementCartProduct,
  incrementProductHandlers,
} from "./actions/incrementCartProduct";
import {
  decrementCartProduct,
  decrementProductHandlers,
} from "./actions/decrementCartProduct";
import { addToCart, addToCartHandlers } from "./actions/addToCart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartId: null,
    cartCount: null,
    totalPrice: null,
    fetchStatus: "idle",
    addStatus: "idle",
    deleteStatus: "idle",
    incrementStatus: "idle",
    decrementStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, fetchHandlers.pending)
      .addCase(fetchCart.fulfilled, fetchHandlers.fulfilled)
      .addCase(fetchCart.rejected, fetchHandlers.rejected)
      .addCase(deleteCartProduct.pending, deleteProductHandlers.pending)
      .addCase(deleteCartProduct.fulfilled, deleteProductHandlers.fulfilled)
      .addCase(deleteCartProduct.rejected, deleteProductHandlers.rejected)
      .addCase(incrementCartProduct.pending, incrementProductHandlers.pending)
      .addCase(
        incrementCartProduct.fulfilled,
        incrementProductHandlers.fulfilled
      )
      .addCase(incrementCartProduct.rejected, incrementProductHandlers.rejected)
      .addCase(decrementCartProduct.pending, decrementProductHandlers.pending)
      .addCase(
        decrementCartProduct.fulfilled,
        decrementProductHandlers.fulfilled
      )
      .addCase(decrementCartProduct.rejected, decrementProductHandlers.rejected)
      .addCase(addToCart.pending, addToCartHandlers.pending)
      .addCase(addToCart.fulfilled, addToCartHandlers.fulfilled)
      .addCase(addToCart.rejected, addToCartHandlers.rejected);
  },
});

export {
  fetchCart,
  addToCart,
  deleteCartProduct,
  incrementCartProduct,
  decrementCartProduct,
};
export default cartSlice.reducer;
