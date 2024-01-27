import { Accessor, Show, createMemo } from "solid-js";
import { useGame } from "../providers/GameProvider";
import { ColumnState, LetterInfo, RowState } from "../types";

interface LetterBoxProps {
  letterInfo: LetterInfo;
  column: number;
  row: number;
}
export const LetterBox = ({ row, column, letterInfo }: LetterBoxProps) => {
  const { activeRow, activeColumn } = useGame();

  const rowState: Accessor<RowState> = createMemo(() => {
    if (activeRow() === row) {
      return RowState.Active;
    }
    if (activeRow() > row) {
      return RowState.Past;
    }
    return RowState.Future;
  });

  const columnState: Accessor<ColumnState> = createMemo(() => {
    if (activeColumn() === column) {
      return ColumnState.Active;
    }
    if (activeColumn() > column) {
      return ColumnState.Past;
    }
    return ColumnState.Future;
  });

  let borderColor = "border-slate-500";
  if (rowState() === RowState.Past) {
    borderColor = "border-slate-300";
  }
  if (rowState() === RowState.Future) {
    borderColor = "border-slate-500";
  }
  return (
    <div
      class={`col-span-1 mx-1 border-2 ${borderColor} min-h-14 max-w-18 flex content-center`}
    >
      <h3
        class={`text-center text-4xl w-14 flex mx-auto justify-center items-center relative`}
        classList={{
          "bg-orange-400":
            !letterInfo.isInCorrrectPosition && letterInfo.isInWord,
          "bg-green-400": letterInfo.isInCorrrectPosition,
        }}
      >
        {letterInfo.letter}
        <Show
          when={
            rowState() === RowState.Active &&
            columnState() === ColumnState.Active
          }
        >
          <hr class="w-10 bg-green-500 absolute bottom-1 h-1" />
        </Show>
      </h3>
    </div>
  );
};
