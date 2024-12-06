<template>
  <v-container>
    <v-card class="mb-4" elevation="7">
      <v-row align="center" class="mt-2" justify="center">
        <div class="polarPlot">
          <BarPlot
            :patient_data="patient"
            orientation="y"
            plot_type="ClosestLeft"
            title="Closest Left"
          ></BarPlot>
        </div>
        <div class="polarPlot">
          <BarPlot
            :patient_data="patient"
            orientation="y"
            plot_type="ClosestRight"
            title="Closest Right"
          ></BarPlot>
        </div>
      </v-row>
    </v-card>
    <v-card class="mb-4" elevation="7">
      <v-row align="center" class="mt-2" justify="center">
        <div class="polarPlot">
          <BarPlot
            :patient_data="patient"
            orientation="y"
            plot_type="GenCC"
            title="GenCC"
          ></BarPlot>
        </div>
        <div class="polarPlot">
          <BarPlot
            :patient_data="patient"
            orientation="y"
            plot_type="MostFreq"
            title="Most Freq"
          ></BarPlot>
        </div>
      </v-row>
    </v-card>
    <v-card class="mb-4" elevation="7">
      <v-row align="center" class="mt-2" justify="center">
        <div class="boxPlot">
          <BarPlot
            :patient_data="patient"
            orientation="y"
            plot_type="TopRelation"
            title="Top Relation"
          ></BarPlot>
        </div>
      </v-row>
    </v-card>
    <v-card class="mb-4" elevation="7">
      <v-row align="center" class="mt-2" justify="center">
        <div class="boxPlot">
          <BarPlot
            :patient_data="patient"
            orientation="x"
            plot_type="MostPathogenic"
            title="Most Pathogenic"
          ></BarPlot>
        </div>
      </v-row>
    </v-card>
    <v-card class="mb-4" elevation="7">
      <v-row align="center" class="mt-2" justify="center">
        <div class="boxPlot">
          <BarPlot
            :patient_data="patient"
            orientation="x"
            plot_type="MostAffect"
            title="Most Affected"
          ></BarPlot>
        </div>
      </v-row>
    </v-card>
    <v-card class="mb-4" elevation="7">
      <v-row align="center" class="mt-2" justify="center">
        <div class="boxPlot">
          <DonutPlot :patient_data="patient"></DonutPlot>
        </div>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import BarPlot from '@/components/annotsv/BarPlot.vue'
import { fetchPatientAnnotData } from '@/api/plotData.ts'
import DonutPlot from '@/components/annotsv/DonutPlot.vue'

const patient = ref(null)
onBeforeMount(async () => {
  const data = await fetchPatientAnnotData()
  patient.value = data
})
</script>

<style scoped>
.polarPlot {
  width: 500px;
  padding: 20px;
}

.boxPlot {
  width: 1000px;
  padding: 20px;
}
</style>
