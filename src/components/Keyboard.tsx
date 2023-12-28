import { useKeyDownEvent } from "@solid-primitives/keyboard";
import { SimpleKeyboard } from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { createEffect, onMount } from "solid-js";
import { useGame } from "../providers/GameProvider";

const keyDownEvent = useKeyDownEvent();

export const Keyboard = () => {
  let sentLetter = false;

  const { submitLetter } = useGame();

  createEffect(() => {
    const e = keyDownEvent();

    if (e && !sentLetter) {
      submitLetter(e.key.toLocaleUpperCase());
      sentLetter = true;
    } else {
      sentLetter = false;
    }
  });

  onMount(() => {
    new SimpleKeyboard({
      onKeyPress: (button) => submitLetter(button),
      layoutName: "default",
      layout: {
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M",
          "{ent}",
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"],
      },
      display: {
        "{numbers}": "123",
        "{ent}": "submit",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC",
      },
    });
  });

  return <div class="simple-keyboard" />;
};
