import "./App.css";
import Page from "./page";
import ErrorBoundary from "./components/ErrorBoundary";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <Page />;
      </ChatProvider>
    </ErrorBoundary>
  );
}

export default App;
