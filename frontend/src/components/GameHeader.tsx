interface GameHeaderProps {
  gameMode: "pvp" | "pvb";
  play: "X" | "O";
}

export default function GameHeader({ gameMode, play }: GameHeaderProps) {
  return (
    <div className="text-center space-y-2">
      <h1 className="font-bold text-6xl text-gray-100 drop-shadow-2xl tracking-tight">
        XO Game
      </h1>
      <p className="text-gray-300 text-lg font-medium">
        {gameMode === "pvp" 
          ? "Player vs Player" 
          : `You: ${play} • Bot: ${play === "X" ? "O" : "X"}`
        }
      </p>
    </div>
  );
}
