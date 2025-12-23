interface GameActionsProps {
  onReset: () => void;
  onBackToMenu: () => void;
}

export default function GameActions({ onReset, onBackToMenu }: GameActionsProps) {
  return (
    <div className="flex gap-4">
      <button 
        onClick={onReset}
        className="
          bg-gray-200 text-gray-900 font-bold text-lg
          px-8 py-3 rounded-full
          shadow-xl hover:shadow-2xl
          transition-all duration-200
          hover:scale-105 active:scale-95
          hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-900
          hover:text-gray-100
          border border-gray-300 hover:border-gray-600
        "
      >
        🔄 Reset
      </button>
      <button 
        onClick={onBackToMenu}
        className="
          bg-gray-700 text-gray-100 font-bold text-lg
          px-8 py-3 rounded-full
          shadow-xl hover:shadow-2xl
          transition-all duration-200
          hover:scale-105 active:scale-95
          hover:bg-gray-600
          border border-gray-600 hover:border-gray-500
        "
      >
        ⬅️ Menu
      </button>
    </div>
  );
}
