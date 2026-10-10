const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function obtenerPosts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}