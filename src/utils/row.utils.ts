export const getActiveRow = (activeIndex: number, wordLength: number) =>
  activeIndex === 0 ? 0 : Math.floor(activeIndex / wordLength);

export const getNextActiveRowFirstColumnIndex = (
  activeIndex: number,
  wordLength: number
) => {
  const activeRow = getActiveRow(activeIndex, wordLength);
  return activeRow * wordLength + 1;
};

export const isActiveIndexLastColumnInRow = (
  activeIndex: number,
  wordLength: number
) => (activeIndex + 1) % wordLength === 0;

export const isActiveIndexFirstColumnInRow = (
  activeIndex: number,
  wordLength: number
) => activeIndex % wordLength === 0;
