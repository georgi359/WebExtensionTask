import type { FetchResponse } from "../types/fetchResponse";

export async function fetchRandomCat(): Promise<FetchResponse> {
  try {
    const catApiUrl = "https://cataas.com/cat";
    const timestamp = new Date().getTime();
    const response = await fetch(catApiUrl, {
      method: "GET",
      cache: "no-store",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Image request failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      success: true,
      imageUrl,
      time: timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? `Failed to fetch cat image: ${error.message}`
          : "Failed to fetch cat image.",
    };
  }
}
