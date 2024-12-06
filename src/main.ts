import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

import { loadFonts } from './plugins/webfontloader'
import '@mdi/font/css/materialdesignicons.css'
import { mdi } from 'vuetify/iconsets/mdi'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import sodiumPlugin from '@/plugins/pinia-sodium'
import layoutPlugin from '@/plugins/layout-config'



const pinia = createPinia()
pinia.use(sodiumPlugin)


loadFonts()
const vuetify = createVuetify({

  components: {
    ...components, VTimePicker
  },

  directives,
  theme: {
    defaultTheme: 'light'
  },
  icons: {
    defaultSet: 'mdi', // Set default icon set to mdi
    sets: {
      mdi
    }
  }
})



const isSue = false

createApp(App).use(layoutPlugin).use(router).use(pinia).provide('isSue', isSue).use(vuetify).mount('#app')


