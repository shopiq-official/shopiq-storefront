import { Cart, CartProduct, CartProductVariant, Product } from "@/types";

export const isInCart = (
  cart: Record<string, CartProduct[]>,
  product: Partial<Product>,
  variants: CartProductVariant,
  quantity?: number
) => {
  // check product exists with same id :
  let found = cart.cart.filter(
    (val: CartProduct) => val.productId._id === product._id
  );

  if (found.length !== 0) {
    // means exists in it

    if (Object.keys(variants).length === 0) {
      return true;
    }

    // lets create a object from found value
    let new_obj: Record<string, string[] | string | undefined> = {};

    found[0].variant?.forEach((val: CartProductVariant) => {
      val.options_name &&
        (new_obj[val.options_name] = Array.isArray(val.options_value)
          ? val.options_value[0]
          : val.options_value);
    });

    let same = false;

    let current_page_state = Object.keys(variants);

    for (let i = 0; i < current_page_state.length; i++) {
      if (
        variants[current_page_state[i] as keyof CartProductVariant] !==
        new_obj[current_page_state[i]]
      ) {
        return false;
      }
    }

    return true;
  } else {
    // means do not exists
    return false;
  }
};
