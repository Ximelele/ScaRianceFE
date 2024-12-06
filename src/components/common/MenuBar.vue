<script lang="ts" setup>
import router from '@/router'

function redirect(url: string) {
  router.push(url)
}
</script>
<template>
  <v-app-bar >
    <v-toolbar-title @click.prevent="redirect('/')">NeoBattenberg</v-toolbar-title>
    <template v-slot:append>
      <v-divider inset vertical></v-divider>
      <v-btn style="height: 100%;" text="StrVCTVRE" @click.prevent="redirect('/strcvr')"></v-btn>
      <v-divider inset vertical></v-divider>
      <v-btn style="height: 100%;" text="AnnotSV" variant="flat" @click.prevent="redirect('/annotsv')"></v-btn>
      <v-divider inset vertical></v-divider>
      <v-btn style="height: 100%;" text="Battenberg" variant="flat" @click.prevent="redirect('/battenberg')"></v-btn>
      <v-divider inset vertical></v-divider>
    </template>

  </v-app-bar>
</template>
