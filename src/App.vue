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

const leftSlotContent = ref<any>(null)
const middleSlotContent = ref<any>(null)

const title = ref<string>('')

const setMenuMiddleComponent = (data: any) => {
  middleSlotContent.value = data.component
}

const setTitle = (title_: string) => {
  title.value = title_
}

const setMenuLeftComponent = (data: any) => {
  leftSlotContent.value = data.component
}
</script>
