const sequence = ["him", "her", "pride", "accessories"];

export const navSequence = (arr: any) => {
  let found = false;

  let updatedArray = arr.map((v: string) => v.trim().toLowerCase());

  for (let i = 0; i < updatedArray.length; i++) {
    if (sequence.includes(updatedArray[i])) {
      found = true;
      break;
    }
  }

  if (found) {
    let new_array = [];

    sequence.forEach((v) => {
      if (updatedArray.includes(v)) {
        new_array.push(updatedArray.splice(updatedArray.indexOf(v), 1)[0]);
      }
    });

    updatedArray = updatedArray.filter((v: any) => v);

    if (updatedArray.length !== 0) new_array.push(...updatedArray);

    return new_array;
  } else {
    return arr;
  }
};
