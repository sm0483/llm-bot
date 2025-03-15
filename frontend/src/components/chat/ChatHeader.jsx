import { IMAGES } from "../../images";

const ChatHeader = ({ onClose }) => (
  <div className="bg-white text-black p-4 flex justify-between items-center border-b md:rounded-2xl">
    <div className="flex items-center space-x-1">
      <button
        onClick={onClose}
        className="p-2 rounded-full bg-transparent hover:bg-gray-200 transition"
      >
        <img
          src={IMAGES.leftOpenButton}
          alt="Back Button"
          className="w-4 h-4 object-contain"
        />
      </button>

      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md flex items-center justify-center">
          <img
            src={IMAGES.logo}
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
        <div>
          <h2 className="font-semibold">Fin</h2>
          <p className="text-xs text-gray-500">The team can also help</p>
        </div>
      </div>
    </div>
  </div>
);

export default ChatHeader;