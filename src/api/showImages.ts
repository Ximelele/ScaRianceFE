import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:6800/api'

export async function fetchImages(): Promise<string[]> {
  try {
    const response = await axios.get<{ images: string[] }>(`${API_BASE_URL}/images`);
    return response.data.images || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

