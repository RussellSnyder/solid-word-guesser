import { JSX } from "solid-js";

export interface LetterGuess {
  isLetterInWord: boolean;
  isLetterInCorrectPlacement: boolean;
}

export enum RowState {
  Active = "Active",
  Past = "Past",
  Future = "Future",
}

export enum ColumnState {
  Active = "Active",
  Past = "Past",
  Future = "Future",
}

// 2D array representing the rows and columns
export type LetterGrid = LetterInfo[][];
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

export enum SpecialValue {
  ENTER = "ENTER",
  DELETE = "DELETE",
}

export enum KeyStatus {
  CORRECT = "CORRECT",
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  DEFAULT = "DEFAULT",
}

export interface KeyboardKey {
  label: string | JSX.Element;
  value: string | SpecialValue;
  status: KeyStatus;
}

export type KeyboardLayout = KeyboardKey[][];

export type SupportedLanguage = "en" | "de";

export interface GameCreationData {
  chosenWord: string;
  language?: SupportedLanguage;
  introMessage?: string;
  emailToShareIfWon?: string;
}
