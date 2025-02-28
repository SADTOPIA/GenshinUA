const urlPath = "http://127.0.0.1:8000";


export async function fetchListCharacters({itemListSlug,filters}) {
  try {
    const response = await fetch(`${urlPath}/${itemListSlug}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const fetchListCharactersData = await response.json();
    return fetchListCharactersData;

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export async function fetchCharacter(itemPageSlug) {
    try {
      const response = await fetch(`${urlPath}/characters/${itemPageSlug}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const fetchCharacterData = await response.json();
      return fetchCharacterData;

    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
;
