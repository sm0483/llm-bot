import "./App.css";
import Page from "./page";
import ErrorBoundary from "./components/ErrorBoundary";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <ErrorBoundary>
        <Page />;
      </ErrorBoundary>
    </ChatProvider>
  );
}

export default App;
