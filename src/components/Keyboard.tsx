import { For, createMemo } from "solid-js";
import { useGame } from "../providers/GameProvider";
import { KeyStatus, KeyboardKey, SpecialValue } from "../types";
import { keyboardLayout_en_us } from "./KeyboardLayouts";

interface KeyProps extends Omit<KeyboardKey, "status"> {}

const statusBgColorMap: Record<KeyStatus, string> = {
  [KeyStatus.DEFAULT]: "",
  [KeyStatus.PRESENT]: "bg-yellow-300",
  [KeyStatus.CORRECT]: "bg-green-300",
  [KeyStatus.ABSENT]: "bg-slate-300",
};

const Key = (props: KeyProps) => {
  const { label, value } = props;
  const { submitLetter, keyboardStates } = useGame();

  const bgColor = createMemo(() => statusBgColorMap[keyboardStates[value]]);

  const minWidth =
    value === SpecialValue.DELETE || value === SpecialValue.ENTER
      ? "min-w-16"
      : "min-w-8";
  return (
    <button
      onClick={() => submitLetter(value)}
      type="button"
      class={`py-2 m-0.5 rounded-lg border-slate-400 border-2 text-2xl text-center flex justify-center ${bgColor()} ${minWidth}`}
    >
      {label}
    </button>
  );
};

interface KeyRowProps {
  keys: KeyProps[];
}

const KeyRow = (props: KeyRowProps) => {
  return (
    <div class="flex justify-center">
      <For each={props.keys}>{(keyProps) => <Key {...keyProps} />}</For>
    </div>
  );
};

export const Keyboard = () => {
  // TODO allow different layouts somehow
  const layout = keyboardLayout_en_us;

  return (
    <div class="m-auto">
      <For each={layout}>{(keysInRow) => <KeyRow keys={keysInRow} />}</For>
    </div>
  );
};
