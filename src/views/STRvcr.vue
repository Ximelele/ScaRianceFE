<template>
  <v-container>
    <v-expansion-panels variant="inset">
      <v-expansion-panel>
        <v-expansion-panel-title class="font-weight-medium"> Filter</v-expansion-panel-title>
        <v-expansion-panel-text class="justify-center align-center">
          <v-slider
            v-model="threshold"
            :max="1"
            :min="0"
            :step="0.01"
            color="secondary"
            show-ticks="always"
            thumb-label="always"
          >
          </v-slider>
          <v-btn block text="Update threshold" @click.prevent="updateData()"> </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--    <v-card class="mb-4" elevation="7">-->
    <!--      <v-row align="center" class="mt-2 mb-2" justify="center">-->
    <!--        <div class="boxPlot">-->
    <!--          <PolarPlot :patient_data="patient"></PolarPlot>-->
    <!--        </div>-->
    <!--      </v-row>-->
    <!--    </v-card>-->
    <v-row align="center" class="mt-2" justify="space-around">
      <v-card class="mb-4" elevation="7">
        <v-card-text>
          <BoxPlot :patient_data="patient" plot_data="BarPlotBox"></BoxPlot>
        </v-card-text>
      </v-card>
      <v-card class="mb-4" elevation="7">
        <v-card-text>
          <BarPlot :patient_data="patient"></BarPlot>
        </v-card-text>
      </v-card>
      <v-card class="mb-4" elevation="7">
        <v-card-text>
          <DonutPlot :patient_data="patient"></DonutPlot>
        </v-card-text>
      </v-card>
      <v-card elevation="7">
        <div class="boxPlot">
          <BoxPlot :patient_data="patient" plot_data="BoxPlot"></BoxPlot>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeMount, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import BarPlot from '@/components/strvctvre/BarPlot.vue'
import { fetchPatientData, generateBarPlot } from '@/api/plotData.ts'
import DonutPlot from '@/components/strvctvre/DonutPlot.vue'
import BoxPlot from '@/components/strvctvre/BoxPlot.vue'

Chart.overrides.polarArea.plugins.legend.display = false
const threshold = ref(0.37)
const patient = ref(null)
onBeforeMount(async () => {
  const data = await fetchPatientData()
  patient.value = data
})

// Function to update patient data
async function updateData() {
  try {
    console.log(patient.value)
    const data = await generateBarPlot(threshold.value)
    patient.value.patient_data = data
    console.log(data)
    nextTick()
  } catch (error) {
    console.error('Error updating data:', error)
  }
}

// Watcher to handle updates to `patient`
watch(
  () => patient.value,
  (newValue, oldValue) => {
    if (newValue && newValue !== oldValue) {
      console.log('Patient data updated:', newValue === oldValue)
    }
  }
)
</script>

<style scoped>

.boxPlot {
  width: 1000px;
  padding: 20px;
}
</style>
