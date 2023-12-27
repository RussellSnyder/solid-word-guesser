import { Keyboard } from "../components/Keyboard";
import { LetterGrid } from "../components/LetterGrid";
import { GameProvider } from "../providers/GameProvider";

export default () => {
  return (
    <div class="container mx-auto px-4">
      <div class="mt-20 mb-10">
        <h1 class="text-4xl text-center">Guess the word</h1>
      </div>
      <GameProvider>
        <div class="mb-16">
          <LetterGrid />
        </div>
        <Keyboard />
      </GameProvider>
    </div>
  );
};
