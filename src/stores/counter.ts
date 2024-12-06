import { defineStore } from "pinia";
import { ref } from 'vue'

export const useChartStore = defineStore("polar", () => {
  // State for chart data
  const chartData = ref<Record<string, any> | null>(null);
  // Action to fetch chart data
  const fetchChartData = async () => {
    try {
      const response = await fetch("./test.json"); // Path to your JSON file
      chartData.value = await response.json();
    } catch (error) {
      console.error("Error loading chart data:", error);
    }
  };

  return {
    chartData,
    fetchChartData,
  };
});
