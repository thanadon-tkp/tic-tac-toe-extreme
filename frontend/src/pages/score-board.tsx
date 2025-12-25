import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

interface Score {
  id: number;
  createdAt: string;
  updatedAt: string;
  score: number;
  user: {
    username: string;
  };
}

export default function ScoreBoard() {
  const [scores, setScores] = useState<Score[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function fetchScores() {
    try {
      setLoading(true);
      const res = await api.get("/api/scores/all");
      // Sort by score descending
      const sortedScores = res.data.sort(
        (a: Score, b: Score) => b.score - a.score
      );
      setScores(sortedScores);
    } catch (err) {
      console.error("Error fetching scores:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchScores();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading scores...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-2 py-8">
      <button
        onClick={() => navigate(-1)}
        className="w-fit mb-4 px-6 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md inline-flex items-center gap-2"
      >
        <span>←</span> Back
      </button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">🏆 Leaderboard</h1>
        <p className="text-gray-300">Top Players Rankings</p>
      </div>
      {/* list */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-white font-semibold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-5">Date</div>
          </div>
        </div>

        {/* Scores List */}
        <div className="divide-y divide-gray-200">
          {scores.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              No scores yet. Be the first to play!
            </div>
          ) : (
            scores.map((item, index) => {
              const rank = index + 1;
              const medal = getMedalIcon(rank);

              return (
                <div
                  key={index}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition ${
                    rank <= 3
                      ? "bg-linear-to-r from-yellow-50 to-orange-50"
                      : ""
                  }`}
                >
                  <div className="col-span-1 text-center">
                    <span className="text-2xl font-bold text-gray-700">
                      {medal || rank}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-linear-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800">
                        {item.user.username}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 font-bold px-4 py-1 rounded-full">
                      {item.score}
                    </span>
                  </div>
                  <div className="col-span-5 text-gray-600 text-sm">
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
