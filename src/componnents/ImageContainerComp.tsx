import { useEffect, useState } from "react";
import { fetchRandomCat } from "../services/catFetchService";
//import {fetchRandomImage} from "../services/jsonFetchService";
import { DateTimeHelper } from "../helpers/dateTimeHelper";
import "./ImgContainerComp.css";

export function ImageContainerComp() {
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

    //const result = await fetchRandomImage();
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
    <section>
      <button
        type="button"
        className="button"
        onClick={handleFetchCat}
        disabled={loading}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Loading cat..." : "Fetch random cat"}
      </button>

      {error && (
        <section id="error-message">
          <p style={{ color: "red" }}>{error}</p>
        </section>
      )}

      {catImageUrl && timestamp && (
        <section id="cat-preview">
          <h2>Random Cat: {DateTimeHelper.formatFullTimestamp(timestamp)}</h2>
          <img className="cat-image" src={catImageUrl} alt="Random cat" />
        </section>
      )}
    </section>
  );
}
