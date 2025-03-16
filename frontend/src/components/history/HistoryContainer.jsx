
function HistoryContainer({ children }) {
  return (
    <div className="fixed inset-0 z-10 bg-white flex flex-col md:inset-auto md:bottom-20 md:right-6 md:w-96 md:h-[75%] md:rounded-2xl md:shadow-xl">
      {children}
    </div>
  );
}

export default HistoryContainer;
