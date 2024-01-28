import { writeClipboard } from "@solid-primitives/clipboard";
import { Icon } from "solid-heroicons";
import { xCircle } from "solid-heroicons/outline";
import { Show, createEffect, createSignal } from "solid-js";
import { useUI } from "../../providers/UIProvider";
import { encodeGameCreationData } from "../../utils/encryption.utils";
import { Input } from "../Input";

// version 1 copy url
// version 2 open modal with different platform sharing options (FB, Twitter, LinkedIn)
// version 3 use share sheet functionality in PWA
export const ShareGameModal = () => {
  const { modalOpen, closeModal } = useUI();
  const [isCopied, setIsCopied] = createSignal(false);
  const [introMessage, setIntroMessage] = createSignal("");

  createEffect(() => {
    if (isCopied()) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  });

  const modal = () =>
    modalOpen()?.type === "ShareGameModal" ? modalOpen() : null;

  const generateShareUrl = () => {
    const baseUrl =
      import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : "https://solid-word-guesser.netlify.app";
    const shareUrl = `${baseUrl}/play/${encodeGameCreationData({
      chosenWord: modalOpen()?.data.chosenWord,
      introMessage: introMessage(),
    })}`;
    return shareUrl;
  };

  return (
    <Show when={modal()}>
      <div
        tabindex="-1"
        class={`backdrop-blur-sm fixed top-1/2 bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)]`}
      >
        <div class="relative w-full max-w-lg max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 class="text-xl font-medium text-gray-900 ">Share Game</h3>
              <button
                onClick={() => closeModal()}
                type="button"
                class="text-gray-600 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="medium-modal"
              >
                <Icon path={xCircle} />
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              <p class="text-gray-700 ">
                Chosen Word: "
                <span class="text-black font-bold">
                  {modal()?.data.chosenWord}
                </span>
                "
              </p>
              <div class="pb-2">
                <p class="mb-1">
                  Would you like to send a message with your game?
                </p>
                <Input
                  value={introMessage()}
                  onInput={setIntroMessage}
                  placeholder="good luck guessing this one ;-)"
                />
              </div>
              <p class="text-gray-700 ">
                link:{" "}
                <span class="text-black font-bold">{generateShareUrl()}</span>
              </p>
            </div>

            <div class="flex flex-row-reverse items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => {
                  writeClipboard(generateShareUrl());
                  setIsCopied(true);
                }}
                data-modal-hide="medium-modal"
                type="button"
                class={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {isCopied() ? "Link Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
