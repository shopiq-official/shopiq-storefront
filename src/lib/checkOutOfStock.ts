import { InventoryInterface } from "./../types/productTypes.d";
// import { InventoryInterface } from "@/types";

export const CheckisOutOfStock = (
  inventory: InventoryInterface,
  quantity: number
) => {
  if (inventory.trackQuantity) {
    if (inventory?.sellOutstock) {
      return false;
    } else {
      if (inventory?.isOutOfStock) {
        return true;
      } else {
        return inventory?.currentQuantity == 0;
      }
    }
  } else {
    return false;
  }
};

export const CheckisQuantityAvailable = (
  inventory: InventoryInterface,
  quantity: number
) => {
  if (inventory?.sellOutstock) {
    return true;
  } else {
    return (inventory?.currentQuantity ?? 0) <= quantity;
  }
};
