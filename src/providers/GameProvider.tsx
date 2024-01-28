import { ParentProps, createContext, createSignal, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { keyboardLayout_en_us } from "../components/KeyboardLayouts";
import { KeyStatus, LetterGrid, LetterInfo, SpecialValue } from "../types";
import { isLetter } from "../utils/string.utils";
import { useUI } from "./UIProvider";

const NUMBER_OF_ROWS = 6;

const generateLettterGrid = (
  wordToGuess: string | undefined
): LetterGrid | undefined => {
  if (!wordToGuess) return;
  const rows = Array.from(Array(NUMBER_OF_ROWS));
  const columns = Array.from(Array(wordToGuess.length));

  return rows.map((_, row) =>
    columns.map((_, column) => ({
      index: row + column,
      row,
      column,
      letter: "",
    }))
  );
};

const isSpecialValue = (value: string) => {
  return value === SpecialValue.ENTER || value === SpecialValue.DELETE;
};

const generateInitialKeyboardStates = () => {
  // TODO allow differnt keyboard layouts
  const keys = keyboardLayout_en_us
    .map((row) => row.map(({ value }) => value))
    .flat()
    .filter((value) => !isSpecialValue(value));
  return keys.reduce(
    (prev, curr) => ({ ...prev, [curr]: KeyStatus.DEFAULT }),
    {}
  );
};

function useProviderValue(wordToGuess: string) {
  const [_, setHasWon] = createSignal(false);
  const [activeRow, setActiveRow] = createSignal(0);
  const [activeColumn, setActiveColumn] = createSignal(0);
  const { setModalOpen } = useUI();
  const [letterGrid, setLetterGrid] = createStore<LetterGrid>(
    generateLettterGrid(wordToGuess) ?? []
  );

  const [keyboardStates, setKeyboardStates] = createStore<
    Record<string, KeyStatus>
  >(generateInitialKeyboardStates());

  const checkWord = () => {
    const letterInfos = letterGrid[activeRow()];
    const wordToCheck = letterInfos.map(({ letter }) => letter).join("");

    if (wordToCheck.length < wordToGuess.length) {
      // TODO show feedback that all letters must be guessed
      return;
    }

    const updatedRow: LetterInfo[] = [];

    letterInfos.forEach((letterInfo, i) => {
      const { letter } = letterInfo;
      const isInCorrrectPosition = wordToGuess[i] === letter;
      const isInWord = wordToGuess.includes(letter);

      updatedRow.push({
        ...letterInfo,
        isInCorrrectPosition,
        isInWord,
      });

      if (isInWord) {
        setKeyboardStates(letter, KeyStatus.PRESENT);
      } else {
        setKeyboardStates(letter, KeyStatus.ABSENT);
      }
      if (isInCorrrectPosition) {
        setKeyboardStates(letter, KeyStatus.CORRECT);
      }
    });

    setLetterGrid(
      produce((s) => {
        s[activeRow()] = updatedRow;
        return s;
      })
    );

    if (wordToCheck === wordToGuess) {
      setHasWon(true);
      setModalOpen({
        type: "WinModal",
      });
    }

    if (activeRow() < NUMBER_OF_ROWS - 1) {
      setActiveRow((index) => index + 1);
      setActiveColumn(0);
    } else {
      setModalOpen({
        type: "LoseModal",
      });
    }
  };

  const incrementActiveIndexIfInRow = () => {
    if (activeColumn() < wordToGuess.length - 1) {
      setActiveColumn((i) => i + 1);
    }
  };
  const decrementActiveIndexIfInRow = () => {
    if (activeColumn() > 0) {
      setActiveColumn((i) => i - 1);
    }
  };

  const activateNextRow = () => {
    setActiveRow((i) => i + 1);
  };

  const deleteLetterInActiveIndex = () => {
    setLetterGrid(
      produce((s) => {
        const currentLetterInfo = s[activeRow()][activeColumn()];
        s[activeRow()][activeColumn()] = {
          ...currentLetterInfo,
          letter: "",
        };
      })
    );
  };

  const handleSpecialValue = (value: SpecialValue) => {
    switch (value) {
      case SpecialValue.ENTER:
        checkWord();
        return true;
      case SpecialValue.DELETE:
        deleteLetterInActiveIndex();
        decrementActiveIndexIfInRow();
        return true;
    }
  };

  return {
    wordToGuess,
    letterGrid,
    submitLetter: (value: string | SpecialValue) => {
      if (value === SpecialValue.ENTER || value === SpecialValue.DELETE) {
        const shouldReturn = handleSpecialValue(value);
        if (shouldReturn) return;
      }
      if (!isLetter(value)) {
        // TODO maybe show user that they input a non letter?
        console.error(`'${value}' is not a letter`);
        return;
      }

      setLetterGrid(
        produce((s) => {
          const currentLetterInfo = s[activeRow()][activeColumn()];
          s[activeRow()][activeColumn()] = {
            ...currentLetterInfo,
            letter: value,
          };
        })
      );
      incrementActiveIndexIfInRow();
    },
    incrementActiveIndexIfInRow,
    decrementActiveIndexIfInRow,
    activateNextRow,
    activeRow,
    activeColumn,
    keyboardStates,
  };
}

export type GameContextType = ReturnType<typeof useProviderValue>;

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps extends ParentProps {
  wordToGuess: string;
}

export const GameProvider = (props: GameProviderProps) => {
  const value = useProviderValue(props.wordToGuess);

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw Error("useGame can only be used in a GameProvider");
  }
  return context;
}
