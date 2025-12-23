interface ScoreBoardProps {
  score: number;
  winStreak: number;
}

export default function ScoreBoard({ score, winStreak }: ScoreBoardProps) {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-gray-700">
      <div className="flex items-center gap-8">
        {/* Score */}
        <div className="text-center">
          <div className="text-sm text-gray-400 font-medium mb-1">Score</div>
          <div
            className={`text-3xl font-bold ${
              score > 0
                ? "text-green-400"
                : score < 0
                ? "text-red-400"
                : "text-gray-300"
            }`}
          >
            {score > 0 ? "+" : ""}
            {score}
          </div>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-700"></div>

        {/* Win Streak */}
        <div className="text-center">
          <div className="text-sm text-gray-400 font-medium mb-1">
            Win Streak
          </div>
          <div className="flex items-center gap-1 text-center justify-center">
            {winStreak >= 3 && <span className="text-yellow-400">⭐</span>}
            <div
              className={`relative text-3xl font-bold ${
                winStreak >= 2
                  ? "text-orange-400"
                  : winStreak >= 1
                  ? "text-blue-400"
                  : "text-gray-300"
              }`}
            >
              {winStreak}
            </div>
            {winStreak >= 3 && <span className="text-yellow-400">⭐</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
