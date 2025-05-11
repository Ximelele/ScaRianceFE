import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:6800/api'

export async function fetchImages(): Promise<{}> {
  try {
    const response = await axios.get<{ images: string[] }>(`${API_BASE_URL}/images`);

    return response.data || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export interface CopyNumberData {
  columns: string[];
  data: Array<Record<string, any>>;
}

/**
 * Fetches copy number data from the API
 * @returns Promise with copy number data (columns and rows)
 */
export async function fetchCopyNumberData(): Promise<CopyNumberData> {
  try {
    const response = await axios.get<CopyNumberData>(`${API_BASE_URL}/copy-number-data`);
    console.log('Copy number data:', response);
    return response.data || { columns: [], data: [] };
  } catch (error) {
    console.error("Error fetching copy number data:", error);
    return { columns: [], data: [] };
  }
}




