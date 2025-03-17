import { IMAGES } from "../../images";
import ButtonIcon from "./ButtonIcon";

function AskQuestionButton({ onAskQuestion, cleanupChat, title }) {
  return (
    <button
      onClick={() => {
        onAskQuestion(), cleanupChat();
      }}
      className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2"
    >
      <span>{title}</span>
      <ButtonIcon
        src={IMAGES.rightOpenButton}
        alt={`${title} Icon`}
        className="invert fill-white mask mask-image"
      />
    </button>
  );
}

export default AskQuestionButton;
