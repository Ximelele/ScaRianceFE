<script setup lang="ts">
import { ref, provide } from 'vue';

const snackbar = ref({
    show: false,
    message: '',
    message_args: {},
    color: 'success',
    timeout: 3000,
    location: 'top'
});

const notification = (message: string, color='success', message_args = {}, timeout=3000, location='top') => {
    snackbar.value.message = message;
    snackbar.value.message_args = message_args;
    snackbar.value.color = color;
    snackbar.value.timeout = timeout;
    snackbar.value.location = location;

    snackbar.value.show = true;
}

provide('notify', notification);
</script>

<template>
    <v-snackbar
        v-model="snackbar.show"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        :location="(snackbar.location as any)"
    >
        {{ $t(snackbar.message, snackbar.message_args) }}
        <template v-slot:actions>
        <v-btn
          @click="snackbar.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <slot></slot>
</template>