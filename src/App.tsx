import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { fetchRandomCat } from "./services/catFetchService";
import { DateTimeHelper } from "./helpers/dateTimeHelper";

function App() {
  const [count, setCount] = useState(0);

  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (catImageUrl) {
        URL.revokeObjectURL(catImageUrl);
      }
    };
  }, [catImageUrl]);

  const handleFetchCat = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchRandomCat();
    setLoading(false);

    if (result.success && result.imageUrl) {
      setCatImageUrl(result.imageUrl);
      setTimestamp(result.time ?? null);
    } else {
      setError(result.error ?? "Unable to load a cat image. Please try again.");
      setCatImageUrl(null);
    }
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <button
          type="button"
          className="counter"
          onClick={handleFetchCat}
          disabled={loading}
          style={{ marginLeft: "1rem" }}
        >
          {loading ? "Loading cat..." : "Fetch random cat"}
        </button>
      </section>

      <div className="ticks"></div>

      {error && (
        <section id="error-message">
          <p style={{ color: "red" }}>{error}</p>
        </section>
      )}

      {catImageUrl && timestamp && (
        <section id="cat-preview">
          <h2>Random Cat: {DateTimeHelper.formatFullTimestamp(timestamp)}</h2>
          <img
            src={catImageUrl}
            alt="Random cat"
            style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        </section>
      )}

      <section id="next-steps">
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Project GitHub</h2>
          <ul>
            <li>
              <a
                href="https://github.com/georgi359/WebExtensionTask"
                target="_blank"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
