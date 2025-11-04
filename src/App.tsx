import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, SearchIcon, FileTextIcon } from "lucide-react";
import SkeletonCard from "./components/SkeletonCard";
import type { Idata } from "./types/data";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<Idata | null>(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Handles search + adds 1s loader for smoother UX
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      // wait 1 second before showing result
      setTimeout(() => {
        setResponse(data);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-6">
      {/* Title */}
      <h1 className="md:text-3xl text-lg font-bold mb-8 text-slate-800 flex items-center gap-2">
        ⚖️ Legal Document Search Portal
      </h1>

      {/* Search Input */}
      <div className="flex items-center gap-3 mb-10">
        <Input
          type="text"
          placeholder="Enter your legal query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-80 shadow-lg  p-3 border-2 border-gray-300"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <>
              <ArrowUpIcon className="w-4 h-4 animate-bounce" />
              Searching...
            </>
          ) : (
            <>
              <SearchIcon className="w-4 h-4" /> Search
            </>
          )}
        </Button>
      </div>

      {/* Skeleton Loader */}
      {loading && <SkeletonCard />}

      {/* Result Card */}
      {!loading && response && (
        <Card className="w-[500px] max-w-full shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow px-5">
          <CardHeader className="font-semibold text-xl flex items-center gap-2 text-slate-800 bg-slate-50 p-4 rounded-t-lg">
            <FileTextIcon className="w-5 h-5 text-blue-600" />
            {response.document}
          </CardHeader>
          <CardContent className="text-slate-600 leading-relaxed p-4">
            {response.summary}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
