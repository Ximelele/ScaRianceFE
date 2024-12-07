<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchPatientAnnotData, fetchPatientSingleBox } from '@/api/plotData';

const patient = ref(null);
const patientAnnot = ref(null);
const loading = ref({ strvctre: true, annotsv: true, battenberg: true }); // Separate loading states
let retryIntervals = { strvctre: null, annotsv: null } as Record<string, number | null>;
const router = useRouter();

// Generic function to fetch data and manage loading states
const fetchData = async (key: string, fetchFn: () => Promise<any>) => {
  loading.value[key] = true;
  try {
    const data = await fetchFn();
    if (key === 'strvctre') patient.value = data;
    if (key === 'annotsv') patientAnnot.value = data;

    if (data) stopRetryInterval(key);
  } catch (err) {
    console.error(`Error fetching ${key} data:`, err);
  } finally {
    loading.value[key] = false;
  }
};

// Retry logic for fetching data
const startRetryInterval = (key: keyof typeof loading, fetchFn: () => Promise<any>) => {
  retryIntervals[key] = setInterval(() => {
    if ((key === 'strvctre' && !patient.value) || (key === 'annotsv' && !patientAnnot.value)) {
      console.log(`Retrying to fetch ${key} data...`);
      fetchData(key, fetchFn);
    }
  }, 2 * 60 * 1000);
};

const stopRetryInterval = (key: keyof typeof loading) => {
  if (retryIntervals[key] !== null) {
    clearInterval(retryIntervals[key]);
    retryIntervals[key] = null;
  }
};

// Navigation function
const redirectToNextPage = (page: string, key: string) => {
  if (!patient.value && key === 'strvctre') {
    console.log('Data not yet loaded for Strvctre. Still processing...');
    return;
  }
  if (!patientAnnot.value && key !== 'strvctre') {
    console.log(`Data not yet loaded for ${key}. Still processing...`);
    return;
  }
  router.push(page);
};

// Lifecycle hooks
onMounted(() => {
  fetchData('strvctre', fetchPatientSingleBox);
  fetchData('annotsv', fetchPatientAnnotData);
  startRetryInterval('strvctre', fetchPatientSingleBox);
  startRetryInterval('annotsv', fetchPatientAnnotData);
});

onUnmounted(() => {
  stopRetryInterval('strvctre');
  stopRetryInterval('annotsv');
});
</script>

<template>
  <v-container class="fill-height">
    <v-row class="d-flex align-center justify-center">
      <v-col class="text-center" cols="6">
        <v-card variant="tonal">
          <v-card-title>Strvctre Data</v-card-title>
          <v-card-text>
            <v-row class="pb-2" justify="center" align="center">
              <v-btn
                v-if="loading.strvctre"
                color="secondary"
                @click.prevent="fetchData('strvctre', fetchPatientSingleBox)"
              >
                <v-progress-circular class="mr-2" color="white" indeterminate size="20" />
              </v-btn>
              <v-btn
                v-else
                color="secondary"
                text="To Strvctre Data"
                @click="redirectToNextPage('/strcvr', 'strvctre')"
              ></v-btn>
            </v-row>
          </v-card-text>

          <v-card-title>Annotsv Data</v-card-title>
          <v-card-text>
            <v-row class="pb-2" justify="center" align="center">
              <v-btn
                v-if="loading.annotsv"
                color="secondary"
                @click.prevent="fetchData('annotsv', fetchPatientAnnotData)"
              >
                <v-progress-circular class="mr-2" color="white" indeterminate size="20" />
              </v-btn>
              <v-btn
                v-else
                color="secondary"
                text="To Annotsv Data"
                @click="redirectToNextPage('/annotsv', 'annotsv')"
              ></v-btn>
            </v-row>
          </v-card-text>

          <v-card-title>Battenberg Data</v-card-title>
          <v-card-text>
            <v-row class="pb-2" justify="center" align="center">
<!--              <v-btn-->
<!--                v-if="true"-->
<!--                color="secondary"-->
<!--                @click.prevent="fetchData('annotsv', fetchPatientAnnotData)"-->
<!--              >-->
<!--                <v-progress-circular class="mr-2" color="white" indeterminate size="20" />-->
<!--              </v-btn>-->
              <v-btn

                color="secondary"
                text="To Battenberg Data"
                @click="redirectToNextPage('/battenberg', 'annotsv')"
              ></v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
