import ChatToggleButton from "./components/ChatToggleButton";
import ChatInterface from "./components/ChatInterface";

function Page() {
  return (
    <div className="relative h-screen w-full bg-gray-light">
      <ChatToggleButton />
      <ChatInterface />
    </div>
  );
}

export default Page;
