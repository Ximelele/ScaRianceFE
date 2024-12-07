<template>
  <v-container>
    <v-row>
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
            <v-btn block text="Update threshold" @click.prevent="updateData()"></v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mb-4 pl" elevation="7">
          <v-card-text>
            <BoxPlot :patient_data="patient.singleBox" plot_data="BarPlotBox"></BoxPlot>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mb-4" elevation="7">
          <v-card-text>
            <BarPlot :patient_data="patient.barPlot"></BarPlot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mb-4" elevation="7">
          <v-card-text>
            <DonutPlot :patient_data="patient.donutPlot"></DonutPlot>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mb-4" elevation="7">
          <!--        <div class="boxPlot">-->
          <BarPlot :patient_data="patient.fullBarPlot" plot_data="BoxPlot"></BarPlot>
          <!--        </div>-->
        </v-card>
      </v-col>
    </v-row>
    <v-row></v-row>
    <v-row>
      <v-col>
        <v-card class="mb-4" elevation="7" width="100%">
          <!--        <div class="boxPlot">-->
          <BoxPlot :patient_data="patient.boxPlot" plot_data="BoxPlot"></BoxPlot>
          <!--        </div>-->
        </v-card>
      </v-col>
    </v-row>
    <!--    </v-row>-->
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import {
  fetchPatientBar,
  fetchPatientBox,
  fetchPatientDonut,
  fetchPatientFullBar,
  fetchPatientSingleBox,
  updateBarPlot
} from '@/api/plotData.ts'
import BoxPlot from '@/components/strvctvre/BoxPlot.vue'
import BarPlot from '@/components/strvctvre/BarPlot.vue'
import DonutPlot from '@/components/strvctvre/DonutPlot.vue'

const threshold = ref(0.37)
const patient = reactive({
  boxPlot: null,
  singleBox: null,
  barPlot: null,
  fullBarPlot: null,
  donutPlot: null
})

onBeforeMount(async () => {
  patient.singleBox = await fetchPatientSingleBox()
  patient.boxPlot = await fetchPatientBox()
  patient.barPlot = await fetchPatientBar()
  patient.fullBarPlot = await fetchPatientFullBar()
  patient.donutPlot = await fetchPatientDonut()
})

async function updateData() {
  try {
    console.log(patient)
    const data = await updateBarPlot(threshold.value)
    patient.barPlot = data
    console.log(data)
  } catch (error) {
    console.error('Error updating data:', error)
  }
}
</script>

<style scoped></style>
