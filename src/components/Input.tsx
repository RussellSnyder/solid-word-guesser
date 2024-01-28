import { JSX } from "solid-js";

interface InputProps<T> {
  value: T;
  onInput: (newValue: T) => void;
  label?: string;
  hint?: string;
  placeholder?: string;
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
}

export function Input<T extends string | number | string[]>(
  props: InputProps<T>
) {
  return (
    <div class="mb-4">
      {props.label ? (
        <label class="block text-gray-700 text-sm font-bold mb-2" for="word">
          {props.label}
        </label>
      ) : null}
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onInput={(e) => props.onInput(e.target.value as T)}
        {...props.inputProps}
      />
      {props.hint ? <span class="text-sm">{props.hint}</span> : null}
    </div>
  );
}
