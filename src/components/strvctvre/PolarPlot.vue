<template>
  <canvas ref="chartCanvas1"></canvas>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  patient_data: {}
})
// Refs for the two chart canvases
const chartCanvas1 = ref<HTMLCanvasElement | null>(null)
Chart.overrides.polarArea.plugins.legend.display = false
// Function to create a Polar Area Chart
const localPatient = ref(null)
const createChart = (canvas: HTMLCanvasElement | null, dataP: any) => {
  if (canvas) {
    new Chart(canvas, {
      type: 'polarArea',
      data: {
        labels: dataP.label,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataP.data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
              'rgb(201, 203, 207)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(47, 79, 79)',
              'rgb(128, 0, 128)',
              'rgb(34, 139, 34)',
              'rgb(240, 230, 140)',
              'rgb(255, 105, 180)',
              'rgb(64, 224, 208)',
              'rgb(139, 69, 19)',
              'rgb(0, 128, 128)',
              'rgb(220, 20, 60)',
              'rgb(244, 164, 96)',
              'rgb(25, 25, 112)',
              'rgb(100, 149, 237)',
              'rgb(72, 61, 139)',
              'rgb(173, 216, 230)',
              'rgb(50, 205, 50)',
              'rgb(255, 140, 0)',
              'rgb(128, 128, 0)'
            ]
          }
        ]
      },
      options: {
        aspectRatio: 1,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'left'
          },
          title: {
            display: true,
            text: 'Mutation per chromosome'
          }
        }
      }
    })
  }
}

watch(
  () => props.patient_data,
  (newVal) => {
    if (newVal !== null) {
      localPatient.value = newVal
      createChart(chartCanvas1.value, localPatient.value.patient_data.PolarPlot)
    }
  },
  { immediate: true } // Optional: Trigger the watcher immediately on component mount
)
</script>

<style scoped></style>
