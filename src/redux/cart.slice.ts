import {
  addToCartApi,
  deleteCartFromServer,
  deleteCartItemFromServer,
  getCartFromServer,
  localToCloudApi,
  updateCartApi,
} from "@/api";
import { getCurrentDate } from "@/lib/getCurrentDate";
import { isInCart } from "@/lib/isInCart";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Simulated API call to fetch cart from the server
const fetchCartFromServer = async () => {
  // resolve({ cartId: "server-cart-id", cart: [{ item: "Server Item 1" }] });

  return new Promise(async (resolve) => {
    try {
      const res = await getCartFromServer();

      resolve(res);
    } catch (err) {
      resolve({ cardId: "", cart: [], hello: "world" });
    }
  });
};

// Fetch cart from localStorage
const fetchCartFromLocalStorage = () => {
  const cartData: string | null = localStorage.getItem(
    `${process.env.NEXT_PUBLIC_CART_NAME}`
  );

  if (cartData !== null) {
    return { cartId: "", cart: JSON.parse(cartData) };
  } else {
    return { cardId: "", cart: [] };
  }
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState }) => {
    const state = getState();
    const isLoggedIn = window?.Retaino?.isLoggedIn();

    if (isLoggedIn) {
      // Fetch from server
      const cartData: any = await fetchCartFromServer();

      return { cardId: cartData.cart[0]._id, cart: cartData.cart[0].products };
    } else {
      // Fetch from localStorage
      const cartData = fetchCartFromLocalStorage();

      return cartData;
    }
  }
);

// local - done
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ id, index }: any, { getState }) => {
    const state: any = getState();
    const isLoggedIn = window?.Retaino?.isLoggedIn();

    if (isLoggedIn) {
      // Delete from server
      await deleteCartItemFromServer(id);

      // Fetch updated cart from the server
      const cart_data: any = await fetchCartFromServer();

      return {
        cardId: cart_data.cart[0]._id,
        cart: cart_data.cart[0].products || [],
      };
    } else {
      // Delete from localStorage
      const { cart } = state.cart;
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_CART_NAME}`,
        JSON.stringify(updatedCart)
      );

      // Fetch updated cart from localStorage
      const updatedCartData = fetchCartFromLocalStorage();
      return updatedCartData;
    }
  }
);

export const emptyCart = createAsyncThunk(
  "cart/emptyCart",
  async (_, { getState }) => {
    const state: any = getState();
    const isLoggedIn = window?.Retaino?.isLoggedIn();

    if (isLoggedIn) {
      // Empty cart on server
      await deleteCartFromServer(state.cartId);

      // Fetch updated cart from the server (which will be an empty cart)
      const cartData = await fetchCartFromServer();
      return cartData;
    } else {
      // Clear cart from localStorage
      localStorage.removeItem(`${process.env.NEXT_PUBLIC_CART_NAME}`);

      // Return empty cart
      return { cartId: "", cart: [] };
    }
  }
);

// local - done
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ data, variants, quantity }: any, { getState }) => {
    const state: any = getState();
    const isLoggedIn = window?.Retaino?.isLoggedIn();

    // find the product id for the variant

    let productId = data._id;

    if (Object.keys(variants).length !== 0 && variants?.size) {
      const dv = data.variant;

      for (let i = 0; i < dv.length; i++) {
        if (
          dv[i].options_name === "size" &&
          dv[i].options_value.includes(variants.size)
        ) {
          productId = dv[i].variantProductId._id;
          break;
        }
      }
    }

    if (isLoggedIn) {
      // If user is logged in, call API to add/update item in the cart
      let res: any;

      if (isInCart(state.cart, { _id: productId }, variants, quantity)) {
        res = await updateCartApi({
          products: state.cart.cart
            .map((val: any) => ({
              productId: val.productId._id,
              mediaUrl: data.mediaUrl[0],
              quantity: val.quantity,
              variant: val.variant,
            }))
            .map((val: any) => {
              let cart_v = val.variant; // which is an array

              let cart_v_object: any = {};

              cart_v.forEach((single_v: any) => {
                cart_v_object[single_v.options_name] = Array.isArray(
                  single_v.options_value
                )
                  ? single_v.options_value[0]
                  : single_v.options_value;
              });

              if (
                Object.keys(cart_v_object).length === 0 &&
                Object.keys(variants).length === 0
              ) {
                return { ...val, quantity: val.quantity + quantity };
              } else {
                const obj_array = Object.keys(cart_v_object);
                for (let i = 0; i < obj_array.length; i++) {
                  if (cart_v_object[obj_array[i]] !== variants[obj_array[i]]) {
                    return val;
                  }
                }
                return { ...val, quantity: val.quantity + quantity };
              }
            }),
        });
      } else {
        const temp_var = Object.keys(variants).map((val) => {
          return {
            options_name: val,
            options_value: variants[val],
          };
        });

        res = await addToCartApi({
          products: [
            {
              productId: productId,
              mediaUrl: data.mediaUrl[0],
              quantity,
              date: getCurrentDate(),
              variant: temp_var,
            },
          ],
        });
      }

      const cartData: any = await fetchCartFromServer();

      return { cardId: cartData.cart[0]._id, cart: cartData.cart[0].products };
    } else {
      let temp_cart: any = [...(state.cart.cart || [])];

      if (isInCart(state.cart, { _id: productId }, variants, quantity)) {
        temp_cart = temp_cart.map((val: any) => {
          let cart_v = val.variant;
          let cart_v_object: any = {};

          cart_v.forEach((single_v: any) => {
            cart_v_object[single_v.options_name] = single_v.options_value;
          });

          if (
            Object.keys(cart_v_object).length === 0 &&
            Object.keys(variants).length === 0
          ) {
            return { ...val, quantity: val.quantity + quantity };
          } else {
            const obj_array = Object.keys(cart_v_object);
            for (let i = 0; i < obj_array.length; i++) {
              if (cart_v_object[obj_array[i]] !== variants[obj_array[i]]) {
                return val;
              }
            }
            return { ...val, quantity: val.quantity + quantity };
          }
        });
      } else {
        const temp_cart_data = {
          productId: { ...data, _id: productId },
          mediaUrl: data.mediaUrl[0],
          quantity: quantity,
          date: getCurrentDate(),
          variant: Object.keys(variants).map((val) => ({
            options_name: val,
            options_value: variants[val],
          })),
        };

        temp_cart.push(temp_cart_data);
      }

      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_CART_NAME}`,
        JSON.stringify(temp_cart)
      );

      return { cartId: "", cart: temp_cart };
    }
  }
);

// local - done
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ id, index, type }: any, { getState, dispatch }) => {
    const state: any = getState();
    const isLoggedIn = window?.Retaino?.isLoggedIn();

    if (!isLoggedIn) {
      // If user is not logged in, update cart in localStorage

      let temp_cart: any = [...(state.cart.cart || [])];

      let updatedItem = { ...temp_cart[index] };

      try {
        if (type == "increase") {
          updatedItem.quantity += 1;
        } else if (type === "decrease") {
          updatedItem.quantity -= 1;
        }
      } catch (err) {}

      if (updatedItem.quantity === 0) {
        dispatch(deleteCartItem({ id, index }));
        return;
      }

      temp_cart[index] = updatedItem;

      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_CART_NAME}`,
        JSON.stringify(temp_cart)
      );

      dispatch(getCart());
    } else {
      // If user is logged in, call API to update quantity

      return new Promise((resolve, reject) => {
        toast
          .promise(
            updateCartApi({
              products: state.cart.cart
                .map((val: any) => ({
                  productId: val.productId._id,
                  mediaUrl: val.mediaUrl,
                  quantity: val.quantity,
                  variant: val.variant,
                }))
                .map((val: any, l_index: number) => {
                  if (l_index === index) {
                    return {
                      ...val,
                      quantity: val.quantity + (type === "increase" ? 1 : -1),
                    };
                  }
                  return val;
                })
                .filter((val: any) => {
                  return val.quantity >= 1;
                }),
            }),
            {
              loading: "Updating Quantity....",
              success: "Quantity Updated Successfully",
              error: "Error While Updating Quantity.",
            }
          )
          .then((res: any) => {
            dispatch(getCart()); // Refresh cart after update
            resolve(res);
          })
          .catch((err: any) => {
            toast.error("Error while updating quantity.");
            reject(err);
          });
      });
    }
  }
);

export const localToCloud = createAsyncThunk(
  "cart/localToCloud",
  async (_, { getState, dispatch }) => {
    const state: any = getState();
    const isLoggedIn = window?.Retaino?.isLoggedIn();

    if (isLoggedIn) {
      const cart = state.cart.cart;

      if (cart.length !== 0) {
        const res = await localToCloudApi({
          products: cart.map((item: any) => ({
            productId: item.productId._id,
            mediaUrl: item?.mediaUrl,
            quantity: item.quantity,
            date: item.date,
            variant: item.variant,
          })),
        });
        localStorage.removeItem(`${process.env.NEXT_PUBLIC_CART_NAME}`);
        dispatch(getCart());
        return res;
      } else {
        dispatch(getCart());
        return;
      }
    } else {
      // If user is not logged in, return early
      console.warn(
        "User is not logged in. Unable to transfer local cart to server."
      );
      return;
    }
  }
);

const initialState: any = {
  cartId: null,
  cart: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action: any) => {
        state.status = "succeeded";

        state.cartId = action.payload.cartId;
        state.cart = action.payload.cart;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action: any) => {
        state.status = "succeeded";

        state.cartId = action.payload.cartId;
        state.cart = action.payload.cart;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(emptyCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emptyCart.fulfilled, (state, action: any) => {
        state.status = "succeeded";
        state.cartId = action.payload.cartId;
        state.cart = action.payload.cart;
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        // Pending state for addToCart
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Fulfilled state for addToCart

        state.cart = action.payload.cart;
        state.cartId = action.payload.cartId;
        toast.success("Product Added to cart.");
      })
      .addCase(addToCart.rejected, (state, action) => {
        // Rejected state for addToCart
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action: any) => {
        state.status = "succeeded";
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(localToCloud.pending, (state) => {
        state.status = "loading";
      })
      .addCase(localToCloud.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(localToCloud.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
