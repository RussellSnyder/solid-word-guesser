import { For } from "solid-js";
import { useGame } from "../providers/GameProvider";
import { LetterBox } from "./LetterBox";

export const LetterGrid = () => {
  const { letterGrid, wordToGuess } = useGame();

  return (
    <div class="mx-auto max-w-screen-lg">
      <div
        class={`grid gap-1`}
        classList={{
          "grid-cols-3": wordToGuess.length === 3,
          "grid-cols-4": wordToGuess.length === 4,
          "grid-cols-5": wordToGuess.length === 5,
          "grid-cols-6": wordToGuess.length === 6,
          "grid-cols-7": wordToGuess.length === 7,
          "grid-cols-8": wordToGuess.length === 8,
          "grid-cols-9": wordToGuess.length === 9,
          "grid-cols-10": wordToGuess.length === 10,
          "grid-cols-11": wordToGuess.length === 11,
          "grid-cols-12": wordToGuess.length === 12,
        }}
      >
        <For each={letterGrid}>
          {(row, i) => {
            return (
              <For each={row}>
                {(column, j) => {
                  return (
                    <LetterBox column={j()} row={i()} letterInfo={column} />
                  );
                }}
              </For>
            );
          }}
        </For>
      </div>
    </div>
  );
};
