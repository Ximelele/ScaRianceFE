import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:6800/api'

export async function fetchPatientSingleBox(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient-single-box`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}

export async function fetchPatientBox(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient-box-plot`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}

export async function fetchPatientBar(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient-bar`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}

export async function fetchPatientDonut(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient-donut`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}

export async function fetchPatientFullBar(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/full-bar-plot`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}

export const updateBarPlot = async (threshold: Number) => {
  try {
    console.log(threshold)
    const response = await axios.post(`${API_BASE_URL}/patient-bar`, {
      threshold
    })
    return response.data
  } catch (error: any) {
    throw error.response
      ? new Error(error.response.data.error)
      : new Error('An error occurred while making the API call')
  }
}

export async function fetchPatientAnnotData(): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/patient-annotsv`, {
      headers: { 'Content-Type': 'application/json' }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    throw error
  }
}

export const fetchChromosomeFiles = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chrFile/list`)
    return response.data.files
  } catch (error) {
    console.error('Error fetching chromosome file list:', error)
    throw error
  }
}

// Function to fetch chromosome data for a specific file
export const fetchChromosomeData = async (filename: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chrFile`, {
      params: { file: filename }
    })
    return response.data // Returns { chromosome, points }
  } catch (error) {
    console.error(`Error fetching data for file ${filename}:`, error)
    throw error
  }
}
