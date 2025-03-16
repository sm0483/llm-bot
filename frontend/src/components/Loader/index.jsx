import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="fixed bottom-6 right-6 z-20 h-12 w-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}

export default Loader;