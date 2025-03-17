import "./App.css";
import Page from "./page";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Page />;
    </ErrorBoundary>
  );
}

export default App;
