<template>
  <canvas ref="chartCanvas1"></canvas>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  patient_data: {},
  plot_type : String,
  orientation : String,
  title : String,
})
// Refs for the two chart canvases
const chartCanvas1 = ref<HTMLCanvasElement | null>(null)
Chart.overrides.polarArea.plugins.legend.display = false
// Function to create a Polar Area Chart
const localPatient = ref(null)
const createChart = (canvas: HTMLCanvasElement | null, dataP: any) => {
  if (canvas) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: dataP.label,
        datasets: [
          {
            data: dataP.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 205, 86, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(201, 203, 207, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(47, 79, 79, 0.5)',
              'rgba(128, 0, 128, 0.5)',
              'rgba(34, 139, 34, 0.5)',
              'rgba(240, 230, 140, 0.5)',
              'rgba(255, 105, 180, 0.5)',
              'rgba(64, 224, 208, 0.5)',
              'rgba(139, 69, 19, 0.5)',
              'rgba(0, 128, 128, 0.5)',
              'rgba(220, 20, 60, 0.5)',
              'rgba(244, 164, 96, 0.5)',
              'rgba(25, 25, 112, 0.5)',
              'rgba(100, 149, 237, 0.5)',
              'rgba(72, 61, 139, 0.5)',
              'rgba(173, 216, 230, 0.5)',
              'rgba(50, 205, 50, 0.5)',
              'rgba(255, 140, 0, 0.5)',
              'rgba(128, 128, 0, 0.5)'
            ],
          }
        ]
      },
      options: {
        indexAxis: props.orientation,
        aspectRatio: 1,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'right'
          },
          title: {
            display: true,
            text: props.title
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
      console.log(props.patient_data.patient_data)
      createChart(chartCanvas1.value, localPatient.value.patient_data[props.plot_type])
    }
  },
  { immediate: true } // Optional: Trigger the watcher immediately on component mount
)
</script>

<style scoped></style>
