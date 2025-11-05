import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, AlertCircle } from "lucide-react";
import SkeletonCard from "./components/SkeletonCard";
import type { Idata } from "./types/data";
import ShowDataCard from "./components/ShowDataCard";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<Idata | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleSearch = async (e: any) => {
    if (e) e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a legal term to search.");
      return;
    }

    setLoading(true);
    setResponse(null);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      setTimeout(() => {
        if (!res.ok) {
          setError(data.error || "Something went wrong!");
        } else {
          setResponse(data);
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">⚖️ Legal Document Search</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search legal document..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-72"
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            "Searching..."
          ) : (
            <>
              <SearchIcon className="w-4 h-4" /> Search
            </>
          )}
        </Button>
      </form>

      {loading && <SkeletonCard />}

      {!loading && error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded mb-4">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {!loading && response && <ShowDataCard response={response} />}
    </div>
  );
}

export default App;
