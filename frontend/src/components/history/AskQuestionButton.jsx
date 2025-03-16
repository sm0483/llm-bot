import { IMAGES } from "../../images";
import ButtonIcon from "./ButtonIcon";

function AskQuestionButton({ onAskQuestion, cleanupChat }) {
  return (
    <button
      onClick={() => {
        onAskQuestion(), cleanupChat();
      }}
      className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2"
    >
      <span>Ask a question</span>
      <ButtonIcon
        src={IMAGES.rightOpenButton}
        alt="Ask Question Icon"
        className="invert fill-white mask mask-image"
      />
    </button>
  );
}

export default AskQuestionButton;
