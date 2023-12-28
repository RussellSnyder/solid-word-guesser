import { useNavigate } from "@solidjs/router";
import { For, createResource, createSignal } from "solid-js";
import { Input } from "../components/Input";

const AVAILABLE_LANGUAGES = {
  en: "English",
};

interface FetchRandomWordOptions {
  language: keyof typeof AVAILABLE_LANGUAGES;
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
  const [randomWordOptions, setRandomWordOptions] =
    createSignal<FetchRandomWordOptions>(
      { language: "en", length: 5 },
      { equals: false }
    );
  const [randomWord, { refetch: refetchRandomWord }] = createResource(
    randomWordOptions,
    fetchRandomWord
  );

  const [chosenWord, setChosenWord] = createSignal<string>("");

  const setChosenWordToRandom = async () => {
    const newRandomWord = await refetchRandomWord();
    setChosenWord(newRandomWord);
  };

  const createGame = () => {
    // TODO encode and decode the word
    navigate(`/play/${chosenWord()}`);
  };

  return (
    <div class="container justify-center flex">
      <div class="mx-auto p-16">
        <h1 class="text-6xl mb-8">Create Game</h1>

        <div class="mb-20 w-full bg-white shadow-md rounded px-8 pt-6 pb-8">
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
                  minLength: 4,
                  maxLength: 12,
                }}
              />
            </div>
            <div class="mb-4 flex-5">
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
                    language: e.currentTarget
                      .value as keyof typeof AVAILABLE_LANGUAGES,
                  }))
                }
              >
                <For each={Object.entries(AVAILABLE_LANGUAGES)}>
                  {([languageCode, languageName]) => (
                    <option value={languageCode}>{languageName}</option>
                  )}
                </For>
                <option disabled>German (Coming Soon)</option>
              </select>
            </div>
          </div>

          <button
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={setChosenWordToRandom}
          >
            {randomWord.loading
              ? "Generating Word...."
              : "Generate Random Word"}
          </button>
        </div>
        <div class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form class="">
            <Input
              label="Choose a Word"
              value={chosenWord()}
              onInput={setChosenWord}
              inputProps={{
                minLength: 4,
                maxLength: 12,
              }}
              hint={"word must be between 4-12 letters"}
            />
            <div class="flex items-center">
              <button
                onClick={createGame}
                class="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
