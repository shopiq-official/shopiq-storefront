

export const CheckisOutOfStock = (inventory:any,quantity:any) => {
    if (inventory.trackQuantity) {
        if (inventory?.sellOutstock) {
          return false;
        } else {
            if (inventory?.isOutOfStock) {
                return true;
            } 
            else {
                return inventory?.currentQuantity ==0;
            }
        }
    }
    else {
        return false;
    }
}

export const CheckisQuantityAvailable = (inventory: any, quantity: any)=>{
    if (inventory?.sellOutstock) {
        return true;
    }
    else { 
      return inventory?.currentQuantity <= quantity;
    } 


}