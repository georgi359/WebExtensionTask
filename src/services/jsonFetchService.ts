import type { FetchResponse } from "../types/fetchResponse";

export async function fetchRandomImage(): Promise<FetchResponse> {
  try {
    const apiUrl = "https://dog.ceo/api/breeds/image/random";
    const timestamp = new Date().getTime();
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Image request failed with status ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
      if (typeof data.message !== "string") {
        throw new Error("Invalid JSON response format.");
      }
    } catch {
      throw new Error("Failed to parse JSON response.");
    }

    //no need to create a blob since we get a static img URL from the API
    //const blob = await response.blob();
    const imageUrl = data.message;

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
          ? `Failed to fetch image: ${error.message}`
          : "Failed to fetch image.",
    };
  }
}
