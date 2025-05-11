<script lang="ts" setup>
import router from '@/router'

function redirect(url: string) {
  router.push(url)
}
</script>
<template>
  <v-app-bar >
    <v-toolbar-title @click.prevent="redirect('/')">ScaRiance</v-toolbar-title>


  </v-app-bar>
</template>
