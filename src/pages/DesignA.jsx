import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { supabase } from "../supabaseClient";

export default function DesignA() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtworks() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError(error.message);
        setArtworks([]);
      } else {
        setArtworks(data ?? []);
      }

      setLoading(false);
    }

    loadArtworks();
  }, []);

  return (
    <main style={{ padding: "24px 0 48px" }}>
      <div className="mobile-back-nav">
        <Link className="back-link" to="/">
          ← Back to homepage
        </Link>
      </div>

      <header>
        <h1>Design A</h1>
        <p>A content-forward grid populated from Supabase.</p>
      </header>

      <div className="page-nav">
        <Link className="back-link desktop-back-link" to="/">
          ← Back to homepage
        </Link>
        <p className="compare-link-text">
          Want to compare layouts? <Link to="/b">View Design B</Link>
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading artwork...</p>
      ) : null}

      {error ? (
        <p style={{ textAlign: "center", color: "crimson" }}>
          Could not load artwork: {error}
        </p>
      ) : null}

      {!loading && !error && artworks.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No artwork rows were returned from the <code>artworks</code> table.
        </p>
      ) : null}

      {!loading && !error && artworks.length > 0 ? (
        <section className="grid-a">
          {artworks.map((item, index) => (
            <Card key={item.id} item={item} priority={index < 2} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
