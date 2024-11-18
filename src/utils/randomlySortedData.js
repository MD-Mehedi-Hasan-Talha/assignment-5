export function randomlySortedArray(array = []) {
  let generetedArray = [...array];

  for (let i = generetedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [generetedArray[i], generetedArray[j]] = [
      generetedArray[j],
      generetedArray[i],
    ];
  }

  return generetedArray;
}
