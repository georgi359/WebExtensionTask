import type { CatResponse } from "../types/catResponse";

export async function fetchRandomCat(): Promise<CatResponse> {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`https://cataas.com/cat`, {
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
        error instanceof Error ? error.message : "Failed to fetch cat image.",
    };
  }
}
