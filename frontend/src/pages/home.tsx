import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function onSelectMode(mode: "pvp" | "pvb", play: "X" | "O") {
    navigate(`/game/${mode}/${play}`);
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center space-y-2">
        <h1 className="font-bold text-6xl text-gray-100 drop-shadow-2xl tracking-tight">
          XO Game
        </h1>
        <p className="text-gray-300 text-lg font-medium">Choose Your Mode</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {/* Player vs Player */}
        <button
          onClick={() => onSelectMode("pvp", "X")}
          className="
              bg-gray-800 hover:bg-gray-700 text-gray-100
              font-bold text-xl py-6 px-8 rounded-2xl
              border-2 border-gray-600 hover:border-gray-500
              shadow-xl hover:shadow-2xl
              transition-all duration-200
              hover:scale-105 active:scale-95
            "
        >
          👥 Player vs Player
        </button>

        {/* Player vs Bot */}
        <div className="space-y-3">
          <button
            onClick={() => onSelectMode("pvb", "X")}
            className="
                w-full bg-linear-to-r from-gray-700 to-gray-800
                hover:from-gray-600 hover:to-gray-700
                text-gray-100 font-bold text-xl py-6 px-8 rounded-2xl
                border-2 border-gray-600 hover:border-gray-500
                shadow-xl hover:shadow-2xl
                transition-all duration-200
                hover:scale-105 active:scale-95
              "
          >
            🤖 Player vs Bot (You are X)
          </button>
          <button
            onClick={() => onSelectMode("pvb", "O")}
            className="
                w-full bg-linear-to-r from-gray-800 to-gray-900
                hover:from-gray-700 hover:to-gray-800
                text-gray-100 font-bold text-xl py-6 px-8 rounded-2xl
                border-2 border-gray-600 hover:border-gray-500
                shadow-xl hover:shadow-2xl
                transition-all duration-200
                hover:scale-105 active:scale-95
              "
          >
            🤖 Player vs Bot (You are O)
          </button>
        </div>

        <button
          onClick={() => navigate("/score-board")}
          className="
              bg-gray-800 hover:bg-gray-700 text-gray-100
              font-bold text-xl py-6 px-8 rounded-2xl
              border-2 border-gray-600 hover:border-gray-500
              shadow-xl hover:shadow-2xl
              transition-all duration-200
              hover:scale-105 active:scale-95
            "
        >
          📊 Score Board
        </button>
      </div>
    </div>
  );
}
