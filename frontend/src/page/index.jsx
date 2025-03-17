import React, { Suspense } from "react";
import Loader from "../components/Loader";

const ChatInterface = React.lazy(() => import("./components/ChatInterface"));
const ChatToggleButton = React.lazy(() =>
  import("./components/ChatToggleButton")
);

function Page() {
  return (
    <div className="relative w-full bg-gray-light">
      <Suspense fallback={<Loader />}>
        <ChatToggleButton />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ChatInterface />
      </Suspense>
    </div>
  );
}

export default Page;
