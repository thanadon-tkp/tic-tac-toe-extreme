interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  isXNext: boolean;
}

export default function GameStatus({ winner, isDraw, isXNext }: GameStatusProps) {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl px-8 py-4 min-w-48 shadow-2xl border border-gray-700">
      <div className="text-center">
        {winner ? (
          <div className="space-y-1">
            <div className="text-sm text-gray-400 font-medium">🎉 Winner!</div>
            <div className={`text-2xl font-bold ${
              winner === "X" 
                ? "text-gray-200" 
                : "text-gray-300"
            }`}>
              {winner}
            </div>
          </div>
        ) : isDraw ? (
          <div className="space-y-1">
            <div className="text-sm text-gray-400 font-medium">Game Over</div>
            <div className="text-2xl font-bold text-gray-300">It's a Draw!</div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-sm text-gray-400 font-medium">Next Player</div>
            <div className={`text-2xl font-bold ${
              isXNext 
                ? "text-gray-200" 
                : "text-gray-300"
            }`}>
              {isXNext ? "X" : "O"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
