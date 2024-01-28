import { Icon } from "solid-heroicons";
import { backspace } from "solid-heroicons/outline";
import { KeyStatus, KeyboardKey, KeyboardLayout, SpecialValue } from "../types";
const createKey = (
  label: string,
  overrides?: Partial<KeyboardKey>
): KeyboardKey => ({
  label,
  value: label,
  status: KeyStatus.DEFAULT,
  ...overrides,
});

export const keyboardLayout_en_us: KeyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((label) =>
    createKey(label)
  ),
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((label) =>
    createKey(label)
  ),
  [
    {
      label: "ENT",
      value: SpecialValue.ENTER,
      status: KeyStatus.DEFAULT,
    },
    ...["Z", "X", "C", "V", "B", "N", "M"].map((label) => createKey(label)),
    {
      label: <Icon height={32} path={backspace} />,
      value: SpecialValue.DELETE,
      status: KeyStatus.DEFAULT,
    },
  ],
];
