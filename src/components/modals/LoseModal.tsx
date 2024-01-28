import { Icon } from "solid-heroicons";
import { xCircle } from "solid-heroicons/outline";
import { Show } from "solid-js";
import { useUI } from "../../providers/UIProvider";

export const LoseModal = () => {
  const { modalOpen, closeModal } = useUI();

  const modal = () => (modalOpen()?.type === "LoseModal" ? modalOpen() : null);

  return (
    <Show when={modal()}>
      <div
        tabindex="-1"
        class={`backdrop-blur-sm fixed top-1/2 bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)]`}
      >
        <div class="relative w-full max-w-lg max-h-full">
          <div class="text-center relative bg-white rounded-lg shadow ">
            <div class="flex items-center justify-between p-4 border-b rounded-t ">
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
            <h3 class="text-4xl font-medium text-gray-900 mb-8">You Lost!</h3>

            <div class="text-9xl mb-10">😔</div>

            <div class="pb-10">
              <p class="text-gray-700 text-xl">Better luck next time!</p>
            </div>

            {/* <div class="flex flex-row-reverse items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
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
            </div> */}
          </div>
        </div>
      </div>
    </Show>
  );
};
