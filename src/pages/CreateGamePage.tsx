import { useNavigate } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { share } from "solid-heroicons/solid";
import { For, createMemo, createResource, createSignal } from "solid-js";
import { Input } from "../components/Input";
import { WORD_MAX_LENGTH, WORD_MIN_LENGTH } from "../constants";
import { useUI } from "../providers/UIProvider";
import { SupportedLanguage } from "../types";
import { encodeGameCreationData } from "../utils/encryption.utils";

interface FetchRandomWordOptions {
  language: SupportedLanguage;
  length: number;
}

const fetchRandomWord = async ({
  language,
  length,
}: FetchRandomWordOptions) => {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?lang=${language}&length=${length}`
    );
    const result = await response.json();
    return result[0].toLocaleUpperCase();
  } catch {
    return "RANDOM";
  }
};

export default () => {
  const navigate = useNavigate();
  const { setModalOpen } = useUI();
  const [randomWordOptions, setRandomWordOptions] =
    createSignal<FetchRandomWordOptions>(
      { language: "en", length: 5 },
      { equals: false }
    );
  const [_, { refetch: refetchRandomWord }] = createResource(
    randomWordOptions,
    fetchRandomWord
  );

  const [isFetchingRandomWord, setIsFetchingRandomWord] = createSignal(false);
  const [chosenWord, setChosenWord] = createSignal<string>("");

  const setChosenWordToRandom = async () => {
    setIsFetchingRandomWord(true);
    const newRandomWord = await refetchRandomWord();
    setChosenWord(newRandomWord);
    setIsFetchingRandomWord(false);
  };

  const generateUrlWithGameDataEncoded = () => {
    return `/play/${encodeGameCreationData({
      chosenWord: chosenWord(),
    })}`;
  };

  const createGame = () => {
    navigate(generateUrlWithGameDataEncoded());
  };

  const isGameCreationDataValid = createMemo(() => {
    if (chosenWord().length < WORD_MIN_LENGTH) return false;
    if (chosenWord().length > WORD_MAX_LENGTH) return false;
    return true;
  });

  return (
    <div class="container justify-center flex mx-auto">
      <div class="p-8">
        <h1 class="text-6xl mb-8 text-center">Create Game</h1>

        <p class="mb-2">
          You can either pass this device to a friend to solve or share the url
          for somebody to solve on their own device
        </p>
        <div class="mb-10 w-full bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div class="w-full flex gap-4">
            <div class="flex-1">
              <Input
                label="word length"
                value={randomWordOptions().length}
                onInput={(newLength) =>
                  setRandomWordOptions((options) => ({
                    ...options,
                    length: newLength,
                  }))
                }
                inputProps={{
                  type: "number",
                  min: WORD_MIN_LENGTH,
                  max: WORD_MAX_LENGTH,
                }}
              />
            </div>
            <div class="mb-4 flex-1">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="word"
              >
                Language
              </label>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="language"
                id="language"
                onChange={(e) =>
                  setRandomWordOptions((options) => ({
                    ...options,
                    language: e.currentTarget.value as SupportedLanguage,
                  }))
                }
              >
                <For each={["en"]}>
                  {(language) => <option value={language}>{language}</option>}
                </For>
                <option disabled>German (Coming Soon)</option>
              </select>
            </div>
          </div>

          <button
            class="w-full bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={setChosenWordToRandom}
          >
            {isFetchingRandomWord()
              ? "Generating Word...."
              : "Generate Random Word"}
          </button>
        </div>
        <div class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form class="">
            <Input
              label="Choose a Word"
              value={chosenWord().toUpperCase()}
              onInput={setChosenWord}
              inputProps={{
                minLength: 4,
                maxLength: 12,
              }}
              hint={`word must be between ${WORD_MIN_LENGTH}-${WORD_MAX_LENGTH} letters`}
            />
            <div class="flex items-center">
              <button
                disabled={!isGameCreationDataValid()}
                onClick={() => {
                  setModalOpen({
                    type: "ShareGameModal",
                    data: {
                      chosenWord: chosenWord().toUpperCase(),
                    },
                  });
                }}
                class={`${
                  isGameCreationDataValid()
                    ? "hover:bg-blue-700 "
                    : "opacity-50 "
                }mr-1 flex justify-center w-full bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
              >
                <span class="mr-1">Share</span>
                <Icon width={25} path={share} />
              </button>
              <button
                disabled={!isGameCreationDataValid()}
                onClick={createGame}
                class={`${
                  isGameCreationDataValid()
                    ? "hover:bg-emerald-700 "
                    : "opacity-50 "
                }ml-1 w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
              >
                Create Game
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
