<template>
  <canvas ref="chartCanvas1"></canvas>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  patient_data: {}
})
const chartCanvas1 = ref<HTMLCanvasElement | null>(null)
Chart.overrides.polarArea.plugins.legend.display = false
const localPatient = ref(null)
const createChart = (canvas: HTMLCanvasElement | null, dataP: any) => {
  if (canvas) {
    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: dataP.label,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataP.data,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
            hoverOffset: 6
          }
        ]
      },
      options: {
        aspectRatio: 1,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'left'
          },
          title: {
            display: true,
            text: dataP.title
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
      createChart(chartCanvas1.value, localPatient.value)
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
