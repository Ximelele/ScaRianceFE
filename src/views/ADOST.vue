<template>
  <div>
    <Carousel :autoplay-timeout="5000" :items-to-show="1">
      <template #addons>
        <Pagination />
        <Navigation />
      </template>
      <Slide v-for="(chartId, index) in chartIds" :key="index">
        <canvas :id="chartId" style="width: 100%; height: 500px;"></canvas>
      </Slide>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import Chart from "chart.js/auto";
import { fetchChromosomeFiles, fetchChromosomeData } from "@/api/plotData.ts";

// State
const chartIds = ref<string[]>([]); // Unique IDs for charts
const loadingFiles = ref(false); // Track loading status for file list

// Function to create an individual scatter plot
const createChart = (canvasId: string, data: any, chromosome: string) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (canvas) {
    new Chart(canvas, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: chromosome,
            data: data.map((point: any) => ({
              x: point.x,
              y: point.y,
            })),
            pointRadius: 1,
            backgroundColor: `rgba(75, 192, 192, 0.8)`,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            title: { display: true, text: "Genomic Position (bp)" },
          },
          y: {
            type: "linear",
            title: { display: true, text: "BAF" },
            min: 0,
            max: 1,
          },
        },
        plugins: {
          legend: { display: true },
          title: { display: true, text: `BAF Plot for ${chromosome}` },
        },
      },
    });
  }
};

// Function to load data for a single file
const loadChromosomeFile = async (filename: string, index: number) => {
  try {
    const { chromosome, points } = await fetchChromosomeData(filename);

    // Add chart for the current chromosome
    const chartId = `chart-${index}`;
    chartIds.value.push(chartId);
    setTimeout(() => createChart(chartId, points, chromosome), 0); // Create chart
  } catch (error) {
    console.error(`Error loading file ${filename}:`, error);
  }
};

// Function to fetch the list of files and load them into the carousel
const loadAllFiles = async () => {
  try {
    loadingFiles.value = true;
    const filenames = await fetchChromosomeFiles();

    // Sequentially load each file
    filenames.forEach((filename: string, index: number) => {
      setTimeout(() => loadChromosomeFile(filename, index), index * 500); // Stagger API calls
    });
  } catch (error) {
    console.error("Error fetching file list:", error);
  } finally {
    loadingFiles.value = false;
  }
};

// Load data on component mount
onMounted(() => {
  loadAllFiles();
});
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 600px;
}
.carousel-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
