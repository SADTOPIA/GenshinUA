const urlPath = 'https://ad33-46-149-95-40.ngrok-free.app';

export default async function fetchDataListItems() {
  try {
    const response = await fetch(`${urlPath}/characters/`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}