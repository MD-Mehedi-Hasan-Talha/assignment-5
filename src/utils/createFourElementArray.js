export default function createFourElementArray(
  existingArray,
  defaultValue = ""
) {
  return Array(4)
    .fill(defaultValue)
    .map((_, index) =>
      existingArray[index] ? existingArray[index] : defaultValue
    );
}
