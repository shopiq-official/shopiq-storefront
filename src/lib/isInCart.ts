export const isInCart = (
  cart: any,
  product: any,
  variants: any,
  quantity: any
) => {
  // check product exists with same id :
  let found = cart.cart.filter((val: any) => val.productId._id === product._id);

  if (found.length !== 0) {
    // means exists in it

    if (Object.keys(variants).length === 0) {
      return true;
    }

    // lets create a object from found value
    let new_obj: any = {};

    found[0].variant.forEach((val: any) => {
      new_obj[val.options_name] = Array.isArray(val.options_value)
        ? val.options_value[0]
        : val.options_value;
    });

    let same = false;

    let current_page_state = Object.keys(variants);

    for (let i = 0; i < current_page_state.length; i++) {
      if (variants[current_page_state[i]] !== new_obj[current_page_state[i]]) {
        return false;
      }
    }

    return true;
  } else {
    // means do not exists
    return false;
  }
};
