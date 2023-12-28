import { ParentProps, createContext, createSignal, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { LetterGrid, LetterInfo } from "../types";
import {
  getActiveRow,
  getNextActiveRowFirstColumnIndex,
  isActiveIndexFirstColumnInRow,
  isActiveIndexLastColumnInRow,
} from "../utils/row.utils";
import { isLetter } from "../utils/string.utils";

const NUMBER_OF_ROWS = 6;

const generateLettterGrid = (
  wordToGuess: string | undefined
): LetterGrid | undefined => {
  if (!wordToGuess) return;
  const totalLetterCount = NUMBER_OF_ROWS * wordToGuess.length;
  const letterInfo: LetterInfo[] = Array.from(Array(totalLetterCount)).map(
    (_, i) => {
      const column = i % wordToGuess.length;
      const row = Math.floor(i / (totalLetterCount / NUMBER_OF_ROWS));
      return {
        index: i,
        row,
        column,
        letter: "",
      };
    }
  );
  return letterInfo;
};

const SPECIAL_INPUT = {
  ARROWLEFT: "ARROWLEFT",
  ARROWRIGHT: "ARROWRIGHT",
  ENTER: "ENTER",
  "{ent}": "{ent}",
  BACKSPACE: "BACKSPACE",
};

const isSpecialInput = (input: string) =>
  Object.keys(SPECIAL_INPUT).includes(input);

function useProviderValue(wordToGuess: string) {
  const [_, setHasWon] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal(0);

  const [letterGrid, setLetterGrid] = createStore<LetterGrid>(
    generateLettterGrid(wordToGuess) ?? []
  );

  const checkWord = () => {
    const activeIndexRow = getActiveRow(activeIndex(), wordToGuess.length);

    const letterInfos = letterGrid.filter(
      (letterInfo) => letterInfo.row === activeIndexRow
    );

    const newLettersInfo: LetterInfo[] = letterInfos.map((letterInfo, i) => {
      const isInCorrrectPosition = wordToGuess[i] === letterInfo.letter;
      const isInWord = wordToGuess.includes(letterInfo.letter);

      return {
        ...letterInfo,
        isInCorrrectPosition,
        isInWord,
      };
    });

    setLetterGrid(
      produce((s) => {
        newLettersInfo.forEach((letterInfo) => {
          s[letterInfo.index] = letterInfo;
        });
      })
    );

    const wordToCheck = letterInfos.map(({ letter }) => letter).join("");
    if (wordToCheck === wordToGuess) {
      setHasWon(true);
      alert("you won!");
    }

    if (activeIndexRow < NUMBER_OF_ROWS) {
      setActiveIndex((index) => index + 1);
    } else {
      alert("you lost!");
    }
  };

  const incrementActiveIndexIfInRow = () => {
    if (!isActiveIndexLastColumnInRow(activeIndex(), wordToGuess.length)) {
      setActiveIndex((i) => i + 1);
    }
  };
  const decrementActiveIndexIfInRow = () => {
    if (!isActiveIndexFirstColumnInRow(activeIndex(), wordToGuess.length)) {
      setActiveIndex((i) => i - 1);
    }
  };

  const activateNextRow = () => {
    setActiveIndex(
      getNextActiveRowFirstColumnIndex(activeIndex(), wordToGuess.length)
    );
  };

  const deleteLetterInActiveIndex = () => {
    setLetterGrid(
      produce((s) => {
        s[activeIndex()] = {
          ...s[activeIndex()],
          letter: "",
        };
      })
    );
  };

  const handleSpecialInput = (input: keyof typeof SPECIAL_INPUT) => {
    switch (input) {
      case "ARROWLEFT":
        decrementActiveIndexIfInRow();
        return true;
      case "ARROWRIGHT":
        incrementActiveIndexIfInRow();
        return true;
      case "ENTER":
      case "{ent}":
        checkWord();
        return true;
      case "BACKSPACE":
        deleteLetterInActiveIndex();
        decrementActiveIndexIfInRow();
        return true;
    }
  };

  return {
    wordToGuess,
    letterGrid,
    submitLetter: (input: string) => {
      if (isSpecialInput(input)) {
        const shouldReturn = handleSpecialInput(
          input as keyof typeof SPECIAL_INPUT
        );
        if (shouldReturn) return;
      }
      if (!isLetter(input)) {
        // TODO maybe show user that they input a non letter?
        console.error(`'${input}' is not a letter`);
        return;
      }

      setLetterGrid(
        (letterInfoInGrid) => letterInfoInGrid.index === activeIndex(),
        "letter",
        input
      );
      incrementActiveIndexIfInRow();
    },
    activeIndex,
    incrementActiveIndexIfInRow,
    decrementActiveIndexIfInRow,
    activateNextRow,
    setActiveIndex,
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

export function useLetterGrid() {
  return useGame().letterGrid;
}
