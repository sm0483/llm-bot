import "./App.css";
import { useState } from "react";
import HistoryComponent from "./components/history";
import ChatComponent from "./components/chat";
import { IMAGES } from "./images";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);

    if (!isChatOpen) {
      setShowHistory(true);
      setShowChat(false);
    } else {
      setShowHistory(false);
      setShowChat(false);
    }
  };

  const handleAskQuestion = () => {
    setShowHistory(false);
    setShowChat(true);
  };

  const handleBackToHistory = () => {
    setShowHistory(true);
    setShowChat(false);
  };

  return (
    <div className="relative h-screen w-full bg-gray-light">
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-20 h-12 w-12 rounded-full 
  bg-black text-white shadow-lg hover:bg-gray-800 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        {isChatOpen ? (
          <img
            src={IMAGES.closeChatButton}
            alt="Close Chat"
            className="w-6 h-6 object-contain filter invert"
          />
        ) : (
          <img
            src={IMAGES.openChatButton}
            alt="Open Chat"
            className="w-6 h-6 object-contain filter invert"
          />
        )}
      </button>

      <div>
        {isChatOpen && showHistory && (
          <HistoryComponent onAskQuestion={handleAskQuestion} />
        )}

        {isChatOpen && showChat && (
          <ChatComponent onClose={handleBackToHistory} />
        )}
      </div>
    </div>
  );
}

export default App;
