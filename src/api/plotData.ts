import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:6800/api'

// Function to fetch patient data
export async function fetchPatientData(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}
export async function fetchPatientAnnotData(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient-annotsv`, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
}


export const fetchChromosomeFiles = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chrFile/list`);
    return response.data.files;
  } catch (error) {
    console.error("Error fetching chromosome file list:", error);
    throw error;
  }
};

// Function to fetch chromosome data for a specific file
export const fetchChromosomeData = async (filename: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chrFile`, {
      params: { file: filename },
    });
    return response.data; // Returns { chromosome, points }
  } catch (error) {
    console.error(`Error fetching data for file ${filename}:`, error);
    throw error;
  }
};

export const generateBarPlot = async (threshold : Number) => {
  try {
    console.log(threshold)
    const response = await axios.post(`${API_BASE_URL}/update-threshold`, {
      threshold,
    });
    return response.data;
  } catch (error : any) {
    throw error.response
      ? new Error(error.response.data.error)
      : new Error("An error occurred while making the API call");
  }
};


export async function fetchBarPlotData(threshold: number) {
  const response = await axios.get(`${API_BASE_URL}/barplot`, { params: { threshold } })
  return response.data
}

export async function fetchDonutPlotData(threshold: number) {
  const response = await axios.get(`${API_BASE_URL}/donutplot`)
  return response.data
}

export async function fetchBoxPlotData(threshold: number, plotType: string) {
  const response = await axios.get(`${API_BASE_URL}/boxplot` )
  return response.data}
