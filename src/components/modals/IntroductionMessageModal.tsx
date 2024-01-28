import { Show } from "solid-js";
import { useUI } from "../../providers/UIProvider";

export const IntroductionMessageModal = () => {
  const { modalOpen, closeModal } = useUI();

  const modal = () =>
    modalOpen()?.type === "IntroductionMessageModal" ? modalOpen() : null;

  return (
    <Show when={modal()}>
      <div
        tabindex="-1"
        class={`backdrop-blur-sm fixed top-1/2 bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)]`}
      >
        <div class="relative w-full max-w-lg max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 class="text-xl font-medium text-gray-900 ">
                Message From Creator
              </h3>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              <p class="text-gray-700">{modal()?.data.message}</p>
            </div>

            <div class="flex flex-row-reverse items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => {
                  closeModal();
                }}
                data-modal-hide="medium-modal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Start the game
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
