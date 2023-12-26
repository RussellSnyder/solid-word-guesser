import { createMemo } from "solid-js";
import { useGame } from "../providers/GameProvider";
import { LetterInfo, RowState } from "../types";

interface LetterBoxProps {
  letterInfo: LetterInfo;
  rowState: RowState;
}
export const LetterBox = ({ rowState, letterInfo }: LetterBoxProps) => {
  const { setActiveIndex, activeIndex } = useGame();

  const isActive = createMemo(() => activeIndex() === letterInfo.index);

  return (
    <div
      onClick={() =>
        rowState === RowState.Active
          ? setActiveIndex(letterInfo.index)
          : undefined
      }
      classList={{
        "border-slate-100": rowState === RowState.Past,
        "border-slate-200": rowState === RowState.Future,
      }}
      class="col-span-1 mx-1 border-2 border-slate-500 min-h-14 max-w-18 flex content-center"
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
        <hr
          class="w-10 bg-green-500 absolute bottom-1"
          classList={{
            "h-1": isActive(),
          }}
        />
      </h3>
    </div>
  );
};
