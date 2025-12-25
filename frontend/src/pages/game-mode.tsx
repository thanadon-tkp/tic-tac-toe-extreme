import { useNavigate, useParams } from "react-router-dom";
import GameHeader from "../components/GameHeader";
import GameActions from "../components/GameActions";
import { useCallback, useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { calculateWinner, getBotMove } from "../utils/gameLogic";
import GameStatus from "../components/GameStatus";
import ScoreBoard from "../components/ScoreBoard";
import api from "../lib/axios";

export default function GameMode() {
  const navigate = useNavigate();
  const { mode, play } = useParams();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);
  const userId = useCallback(() => Math.floor(Math.random() * 5) + 1, [])();

  function handleClick(index: number) {
    if (board[index] || winner) return;

    if (mode === "pvb") {
      const isPlayerTurn = play === "X" ? isXNext : !isXNext;
      if (!isPlayerTurn) return;
    }

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? "X" : "O";

    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));

    if (mode !== "pvb") return;

    setIsXNext(true);
  }

  function backToMenu() {
    navigate("/");
  }

  function onAddScore() {
    if (winStreak >= 3) {
      setScore((prev) => prev + 2);
      setWinStreak(0);
      onInsertScore(2);
      return;
    }

    setScore((prev) => prev + 1);
    setWinStreak((prev) => prev + 1);
    onInsertScore(1);
  }

  function updateScoreAndStreak(winner: string | null) {
    if (winner) {
      const isPlayerWinner =
        (play === "X" && winner === "X") || (play === "O" && winner === "O");
      if (isPlayerWinner) {
        setScore((prev) => prev + 1);
        setWinStreak((prev) => prev + 1);

        if (winStreak + 1 >= 3) {
          setScore((prev) => prev + 1);
          onInsertScore(2);
          return;
        }

        onInsertScore(1);
      } else {
        setWinStreak(0);
        setScore((prev) => prev - 1);
        onInsertScore(-1);
      }
    } else if (isDraw) {
      setWinStreak(0);
    }
  }

  async function onInsertScore(score: number) {
    await api.post("/api/scores", { score, userId });
  }

  useEffect(() => {
    if (mode !== "pvb") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateScoreAndStreak(winner);
  }, [winner, isDraw]);

  const handleBotMove = useCallback(
    (index: number) => {
      const nextBoard = [...board];
      nextBoard[index] = isXNext ? "X" : "O";
      setBoard(nextBoard);
      setIsXNext(!isXNext);
    },
    [board, isXNext]
  );

  // bot auto play
  useEffect(() => {
    if (mode === "pvb" && !winner && !isDraw) {
      const isBotTurn = play === "X" ? !isXNext : isXNext;

      if (isBotTurn) {
        const timer = setTimeout(() => {
          const bestMove = getBotMove(board, play === "O");
          if (bestMove !== null) {
            handleBotMove(bestMove);
          }
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [board, isXNext, mode, winner, isDraw, play, handleBotMove]);

  if (mode !== "pvp" && mode !== "pvb") {
    return <div>Invalid game mode.</div>;
  }

  if (play !== "X" && play !== "O") {
    return <div>Invalid player choice.</div>;
  }

  return (
    <div className="flex flex-col gap-x-4 gap-y-8 justify-center items-center">
      <p className="text-white font-bold">userId: {userId}</p>
      <GameHeader gameMode={mode} play={play} />
      <div className="flex gap-4">
        {mode === "pvb" && <ScoreBoard score={score} winStreak={winStreak} />}
        <GameStatus winner={winner} isDraw={isDraw} isXNext={isXNext} />
      </div>
      <GameBoard board={board} onCellClick={handleClick} winner={winner} />
      <GameActions onReset={resetGame} onBackToMenu={backToMenu} />
      {mode === "pvb" && (
        <button
          className="
          bg-gray-200 text-gray-900
          px-8 py-2 rounded-full
          shadow-xl hover:shadow-2xl
          transition-all duration-200
          hover:scale-105 active:scale-95
          hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-900
          hover:text-gray-100
          border border-gray-300 hover:border-gray-600
        "
          onClick={onAddScore}
        >
          Add Score
        </button>
      )}
    </div>
  );
}
