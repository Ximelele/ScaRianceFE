<template>
  <v-app>
    <v-main>
      <MenuBar> </MenuBar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import MenuBar from '@/components/common/MenuBar.vue'

defineComponent({
  components: { MenuBar }
})


</script>
