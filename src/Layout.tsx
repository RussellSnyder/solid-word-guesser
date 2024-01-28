import { ParentProps } from "solid-js";
import { IntroductionMessageModal } from "./components/modals/IntroductionMessageModal";
import { ShareGameModal } from "./components/modals/ShareGameModal";
import { UIProvider } from "./providers/UIProvider";

interface PageLayoutProps extends ParentProps {}

export const PageLayout = (props: PageLayoutProps) => {
  return (
    <UIProvider>
      <div>
        {props.children}
        {/* <footer>footer</footer> */}
        {/* Modals */}
        <ShareGameModal />
        <IntroductionMessageModal />
      </div>
    </UIProvider>
  );
};
