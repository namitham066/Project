import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));
    
      if (!user || user.role !== "customer") {
        alert("Only customers can add items to the cart.");
        return;
      }
    
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
    
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    

    updateQuantity: (state, action) => {
      const { id, actionType } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                actionType === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});


export const { addToCart, updateQuantity, removeItem } = cartSlice.actions;


export const addToCartAndSave = (product, user) => async (dispatch) => {
  if (!user || user.role !== "customer") {
    alert("Please log in as a customer to add items to the cart.");
    return;
  }

  dispatch(addToCart(product)); 

  try {
    const response = await fetch("http://localhost:5000/api/cart/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        userId: user.id,
        product: {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.img,
          size: product.size,
          quantity: product.quantity || 1,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart in MongoDB");
    }

    const data = await response.json();
    console.log("Response from backend:", data);
  } catch (error) {
    console.error("Error adding to cart in MongoDB:", error);
  }
};

export default cartSlice.reducer;
