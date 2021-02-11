export const addElement = <T>(array: T[], element: T, index: number) => {
  const newArray = [...array];
  newArray.splice(index, 0, element);

  return newArray;
};

export const moveElement = <T>(array: T[], oldIndex: number, newIndex: number): T[] => {
  const newArray = [...array];
  newArray.splice(newIndex, 0, newArray.splice(oldIndex, 1)[0]);

  return newArray;
};

export const removeElement = <T>(array: T[], index: number): T[] => {
  const newArray = [...array];
  newArray.splice(index, 1);

  return newArray;
};
