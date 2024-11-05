export const calcPrice = (arg: any) => {
  return arg
    ?.map((val: any) => val.optionValue)
    ?.reduce((a: number, b: number) => {
      return a + b;
    }, 0);
};

// when advance pricing is true . you can calculate the total price of the product using this function.
//send the inventory object and the selected variant . 

export const calculateAdvancePricing = (data:any,selectedvariant:any) => {

     let sum = 0;
     if (data.advancePricing) {
     
           data?.advancePricingValues.forEach(
             (val: any) => {
               const temp = Object.keys(selectedvariant).forEach(
                 (value: any) => {
                   if (val.optionTitle == "Custom 1" && value == "custom-1") {
                     if (val.optionSpec == selectedvariant[value]) {
                       // console.log(val.optionValue);
                       sum += val.optionValue;
                     }
                   }
                   if (val.optionTitle == "Custom - 2" && value == "custom-2") {
                     if (val.optionSpec == selectedvariant[value]) {
                       // console.log(val.optionValue);
                       sum += val.optionValue;
                     }
                   }
                 }
               );
               // console.log(temp);
             }
           );
         
       
       return sum;
     } else {
       return data?.pricing?.price;
      //  setActualPrice(data?.pricing?.price);
     }
   
}