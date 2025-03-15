import { AlertTriangle, RefreshCcw } from "lucide-react";

const ErrorFallback = ({ errorInfo, onReset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full animate-slide-up">
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full bg-gray-200 p-3">
            <AlertTriangle className="w-8 h-8 text-gray-800" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Something went wrong
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-900 mb-2">An unexpected error occurred</p>
          {errorInfo && (
            <pre className="text-sm text-gray-900 overflow-auto max-h-40">
              {errorInfo.componentStack}
            </pre>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;