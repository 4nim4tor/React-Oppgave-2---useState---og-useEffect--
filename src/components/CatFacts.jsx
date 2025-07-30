import { useEffect, useState } from "react";
import "./CatFacts.css";

export default function CatFacts() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   const fetchFacts = () => {
  //     setLoading(true);
  //     setError(null);

  //     const requests = Array.from({ length: 5 }, () =>
  //       fetch("https://catfact.ninja/fact").then((response) => {
  //         if (!response.ok) throw new Error("Failed to fetch the kitty facts");
  //         return response.json();
  //       })
  //     )

  //     Promise.all(requests)
  //       .then((results) => {
  //         setFacts(results);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setError(err.message);
  //         setLoading(false);
  //       });
  //   };

  const fetchFacts = async () => {
    setLoading(true);
    setError(null);

    const uniqueFacts = new Set();
    const maxTries = 15;
    let tries = 0;

    try {
      while (uniqueFacts.size < 5 && tries < maxTries) {
        const response = await fetch("https://catfact.ninja/fact");
        if (!response.ok) throw new Error("Failed to fetch a kitty fact");
        const data = await response.json();

        uniqueFacts.add(data.fact);
        tries++;
      }

      if (uniqueFacts.size < 5) {
        throw new Error("Could not fetch enough unique facts");
      }
      setFacts(Array.from(uniqueFacts).map((fact) => ({ fact })));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  return (
    <div className="catfacts-container">
      <h2>😺 Random Cat Facts</h2>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">⚠️ {error}</p>}

      {!loading && !error && (
        <div className="fact-list">
          {facts.map((factObj, index) => (
            <div key={index} className="fact-card">
              🐾 {factObj.fact}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          fetchFacts();
        }}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get More Facts"}
      </button>
    </div>
  );
}
