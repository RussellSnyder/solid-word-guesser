import { useNavigate, useParams } from "@solidjs/router";
import { onMount } from "solid-js";
import { Keyboard } from "../components/Keyboard";
import { LetterGrid } from "../components/LetterGrid";
import { GameProvider } from "../providers/GameProvider";
import { useUI } from "../providers/UIProvider";
import { GameCreationData } from "../types";
import { decodeGameCreationString } from "../utils/encryption.utils";

export default () => {
  const navigate = useNavigate();
  const { setModalOpen } = useUI();
  const params = useParams();
  const { gamedata: gameDataString } = params;
  const gameData: GameCreationData = decodeGameCreationString(gameDataString);

  onMount(() => {
    if (gameData.introMessage) {
      setModalOpen({
        type: "IntroductionMessageModal",
        data: {
          message: gameData.introMessage,
        },
      });
    }
  });

  return (
    <div class="container mx-auto px-4">
      <button
        class="absolute top-3 right-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="button"
        onClick={() => navigate("/create")}
      >
        Create A New Game
      </button>
      <div class="mt-20 mb-10">
        <h1 class="text-4xl text-center">Guess the word</h1>
      </div>
      <GameProvider wordToGuess={gameData.chosenWord}>
        <div class="mb-16">
          <LetterGrid />
        </div>
        <Keyboard />
      </GameProvider>
    </div>
  );
};
