import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 2,
    total: 0,
    isLoading: true,
};

const url = "http://localhost:4000/cartItems"
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {

    const res = await fetch(url);
    const data = await res.json();
    return data;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        },
        increase: (state, action) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => (item.id === itemId));
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, action) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => (item.id === itemId));
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotal: (state) => {

            let total = 0;
            let amount = 0;

            state.cartItems.forEach(item => {

                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.isLoading = true;
            })
    }
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;