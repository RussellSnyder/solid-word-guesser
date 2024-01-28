import { ParentProps, createContext, createSignal, useContext } from "solid-js";

interface ModalDataInstance {
  type: string;
  data: any;
}

const EmptyModal: ModalDataInstance = {
  type: "Empty",
  data: null,
};

export interface ShareGameModalData {
  type: "ShareGameModal";
  data: {
    chosenWord: string;
  };
}

export interface IntroductionMessageModalData {
  type: "IntroductionMessageModal";
  data: {
    message: string;
  };
}

function useProviderValue() {
  const [modalOpen, setModalOpen] = createSignal<ModalDataInstance | null>(
    EmptyModal,
    {
      equals: false,
    }
  );

  const closeModal = () => setModalOpen(EmptyModal);

  return {
    closeModal,
    modalOpen,
    setModalOpen,
  };
}

export type UIContextType = ReturnType<typeof useProviderValue>;

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps extends ParentProps {}

export const UIProvider = (props: UIProviderProps) => {
  const value = useProviderValue();

  return (
    <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw Error("useUI can only be used in a UIProvider");
  }
  return context;
}
