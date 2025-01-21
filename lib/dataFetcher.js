const urlPath = 'http://127.0.0.1:8000';

// export async function fetchDataListItems(itemListSlug, body) {
//   try {
//     console.log(body);
//     const response = await fetch(`${urlPath}/${itemListSlug}/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify( {}),
//     });
//
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// }


export async function fetchDataItem(itemPageSlug) {
  try {
    const response = await fetch(`${urlPath}/characters/${itemPageSlug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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