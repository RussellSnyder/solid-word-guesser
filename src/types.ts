export interface LetterGuess {
  isLetterInWord: boolean;
  isLetterInCorrectPlacement: boolean;
}

export enum RowState {
  Active = "Acitve",
  Past = "Past",
  Future = "Future",
}

// 2D array representing the rows and columns
export type LetterGrid = LetterInfo[];
// The row and column of a letter
export type LetterInfo = {
  index: number;
  row: number;
  column: number;
  letter: string;
  isInWord?: boolean;
  isInCorrrectPosition?: boolean;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
