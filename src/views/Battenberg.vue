<script lang="ts" setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { onMounted, ref } from 'vue'
import { fetchImages } from '@/api/showImages.ts'
import Lightbox from 'vue-easy-lightbox'

// Reactive state for the images
const images = ref<string[]>([])

// State to manage lightbox visibility and selected image
const showZoom = ref(false)
const selectedImage = ref<string | null>(null)

// Function to open the lightbox
const openZoomLightbox = (image: string) => {
  selectedImage.value = image
  showZoom.value = true
}

// Fetch image URLs on component mount
onMounted(async () => {
  images.value = await fetchImages()
})
</script>

<template>
  <Carousel :items-to-show="1">
    <template #addons>
      <Pagination />
      <Navigation />
    </template>
    <Slide v-for="(image, index) in images" :key="index">
      <v-col cols="11">
        <img
          :src="image"
          alt="Carousel Image"
          class="carousel-image"
          @click="openZoomLightbox(image)"
        />
      </v-col>
    </Slide>
  </Carousel>

  <!-- Lightbox for zooming -->
  <Lightbox
    :visible="showZoom"
    :imgs="[selectedImage]"
    :index="0"
    @hide="showZoom = false"
  />
</template>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%; /* Forces the image to fill the container height */
  object-fit: cover; /* Crop the image to fill the box while maintaining aspect ratio */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

</style>
