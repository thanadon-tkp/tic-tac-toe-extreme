interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winner: string | null;
}

export default function GameBoard({ board, onCellClick, winner }: GameBoardProps) {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-700">
      <div className="grid grid-cols-3 gap-3">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            className={`
              w-24 h-24 rounded-xl font-bold text-5xl
              transition-all duration-200
              ${value 
                ? 'bg-gray-900 shadow-inner border border-gray-600' 
                : 'bg-linear-to-br from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 shadow-md hover:shadow-lg hover:scale-105'
              }
              ${!value && !winner ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'}
              ${value === "X" ? "text-gray-200" : ""}
              ${value === "O" ? "text-gray-300" : ""}
            `}
            disabled={!!value || !!winner}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
