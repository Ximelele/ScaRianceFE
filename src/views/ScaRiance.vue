<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { fetchCopyNumberData, fetchImages } from '@/api/showImages.ts'
import Lightbox from 'vue-easy-lightbox'
// Import Vuetify components
import { VDataTable } from 'vuetify/components'

// Reactive state for the images
const images = ref<Record<string, string[]>>({})
const imageCategories = computed(() => Object.keys(images.value))

// State to manage lightbox visibility and selected category for lightbox
const showZoom = ref(false)
const selectedCategory = ref<string | null>(null)
const currentIndex = ref(0)

// State to manage current carousel indexes
const carouselIndexes = ref<Record<string, number>>({})

// Function to open the lightbox with a specific category and image index
const openZoomLightbox = (category: string, index: number = 0) => {
  selectedCategory.value = category
  currentIndex.value = index
  showZoom.value = true
}

// Computed property to get images for the selected category
const selectedCategoryImages = computed(() => {
  if (!selectedCategory.value || !images.value[selectedCategory.value]) {
    return []
  }
  return images.value[selectedCategory.value]
})

// Function to get the current image for a category
const getCurrentImage = (category: string) => {
  if (!images.value[category] || images.value[category].length === 0) {
    return ''
  }
  const index = carouselIndexes.value[category] || 0
  return images.value[category][index]
}

// Category labels for better display
const categoryLabels = {
  heterozygousData: 'Heterozygous Data',
  RAFseg: 'RAF Segmentation',
  segment: 'Segmentation',
  copynumberprofile: 'Copy Number Profile',
  cnv_per_chrom: 'CNV Per Chromosome'
}

// Initialize carousel indexes
onMounted(() => {
  imageCategories.value.forEach(category => {
    carouselIndexes.value[category] = 0
  })
})

// Function to navigate to the next image in a category
const nextImage = (category: string) => {
  if (!images.value[category] || images.value[category].length === 0) return

  const currentIndex = carouselIndexes.value[category] || 0
  const nextIndex = (currentIndex + 1) % images.value[category].length
  carouselIndexes.value[category] = nextIndex
}

// Function to navigate to the previous image in a category
const prevImage = (category: string) => {
  if (!images.value[category] || images.value[category].length === 0) return

  const currentIndex = carouselIndexes.value[category] || 0
  const prevIndex = (currentIndex - 1 + images.value[category].length) % images.value[category].length
  carouselIndexes.value[category] = prevIndex
}

// Table data state
const tableData = ref([])
const tableColumns = ref([])
const tableLoading = ref(true)
const tableError = ref(null)

// Pagination state from backend
const pagination = ref({
  page: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0
})

// Vuetify data table options
const tableOptions = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
})

// Watch for changes in table options to request new data
watch(tableOptions, (newOptions) => {
  fetchTableData(newOptions.page, newOptions.itemsPerPage)
}, { deep: true })

// Function to fetch table data from API with pagination
const fetchTableData = async () => {
  tableLoading.value = true;

  try {
    // Update API call to include pagination parameters
    const result = await fetchCopyNumberData( );
    tableColumns.value = result.columns;
    tableData.value = result.data;

  } catch (error) {
    tableError.value = 'Failed to load data';
    console.error(error);
  } finally {
    tableLoading.value = false;
  }
};

// Modified onMounted to fetch both images and table data
onMounted(async () => {
  // Fetch images and table data in parallel
  try {
    const [imagesResult] = await Promise.all([
      fetchImages(),
      fetchTableData(1, 10) // Initial load with first page, 10 items per page
    ])
    images.value = imagesResult

    // Initialize carousel indexes
    Object.keys(imagesResult).forEach(category => {
      carouselIndexes.value[category] = 0
    })
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

// Function to format number values for display
const formatNumber = (value: number): string => {
  if (value === null || value === undefined) return ''

  // For small numbers near zero (like p-values), use scientific notation
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(6)
  }

  // For larger numbers, use fixed precision
  return value.toFixed(value % 1 === 0 ? 0 : 4)
}

// Format headers for v-data-table (needs 'title' and 'key' properties)
const headers = computed(() => {
  return tableColumns.value.map(column => ({
    title: column,
    key: column,
    align: typeof tableData.value[0]?.[column] === 'number' ? 'end' : 'start',
    sortable: true,
  }))
})

// Toggle for showing the table or images
const activeView = ref('images') // 'images' or 'table'
</script>

<template>
  <div class="app-container">
    <!-- View toggle buttons -->
    <div class="view-toggle">
      <button
        :class="{ active: activeView === 'images' }"
        @click="activeView = 'images'"
      >
        Image Gallery
      </button>
      <button
        :class="{ active: activeView === 'table' }"
        @click="activeView = 'table'"
      >
        Copy Number Data
      </button>
    </div>

    <!-- Image Gallery View -->
    <div v-if="activeView === 'images'" class="image-gallery-grid">
      <!-- RAF Segmentation -->
      <div class="gallery-item" v-if="images.RAFseg && images.RAFseg.length > 0">
        <div class="image-container">
          <img
            :src="getCurrentImage('RAFseg')"
            alt="RAF Segmentation"
            class="gallery-image"
            @click="openZoomLightbox('RAFseg', carouselIndexes.RAFseg || 0)"
          />
          <div class="carousel-controls">
            <button class="nav-button prev" @click.stop="prevImage('RAFseg')">
              <span class="arrow">&#10094;</span>
            </button>
            <button class="nav-button next" @click.stop="nextImage('RAFseg')">
              <span class="arrow">&#10095;</span>
            </button>
          </div>
          <div class="image-title">
            RAF Segmentation
          </div>
        </div>
      </div>

      <!-- CNV Per Chromosome -->
      <div class="gallery-item" v-if="images.cnv_per_chrom && images.cnv_per_chrom.length > 0">
        <div class="image-container">
          <img
            :src="getCurrentImage('cnv_per_chrom')"
            alt="CNV Per Chromosome"
            class="gallery-image"
            @click="openZoomLightbox('cnv_per_chrom', carouselIndexes.cnv_per_chrom || 0)"
          />
          <div class="carousel-controls">
            <button class="nav-button prev" @click.stop="prevImage('cnv_per_chrom')">
              <span class="arrow">&#10094;</span>
            </button>
            <button class="nav-button next" @click.stop="nextImage('cnv_per_chrom')">
              <span class="arrow">&#10095;</span>
            </button>
          </div>
          <div class="image-title">
            CNV Per Chromosome
          </div>
        </div>
      </div>

      <!-- Copy Number Profile -->
      <div class="gallery-item" v-if="images.copynumberprofile && images.copynumberprofile.length > 0">
        <div class="image-container">
          <img
            :src="getCurrentImage('copynumberprofile')"
            alt="Copy Number Profile"
            class="gallery-image"
            @click="openZoomLightbox('copynumberprofile', carouselIndexes.copynumberprofile || 0)"
          />
          <div class="carousel-controls">
            <button class="nav-button prev" @click.stop="prevImage('copynumberprofile')">
              <span class="arrow">&#10094;</span>
            </button>
            <button class="nav-button next" @click.stop="nextImage('copynumberprofile')">
              <span class="arrow">&#10095;</span>
            </button>
          </div>
          <div class="image-title">
            Copy Number Profile
          </div>
        </div>
      </div>

      <!-- Heterozygous Data -->
      <div class="gallery-item" v-if="images.heterozygousData && images.heterozygousData.length > 0">
        <div class="image-container">
          <img
            :src="getCurrentImage('heterozygousData')"
            alt="Heterozygous Data"
            class="gallery-image"
            @click="openZoomLightbox('heterozygousData', carouselIndexes.heterozygousData || 0)"
          />
          <div class="carousel-controls">
            <button class="nav-button prev" @click.stop="prevImage('heterozygousData')">
              <span class="arrow">&#10094;</span>
            </button>
            <button class="nav-button next" @click.stop="nextImage('heterozygousData')">
              <span class="arrow">&#10095;</span>
            </button>
          </div>
          <div class="image-title">
            Heterozygous Data
          </div>
        </div>
      </div>

      <!-- Segmentation -->
      <div class="gallery-item" v-if="images.segment && images.segment.length > 0">
        <div class="image-container">
          <img
            :src="getCurrentImage('segment')"
            alt="Segmentation"
            class="gallery-image"
            @click="openZoomLightbox('segment', carouselIndexes.segment || 0)"
          />
          <div class="carousel-controls">
            <button class="nav-button prev" @click.stop="prevImage('segment')">
              <span class="arrow">&#10094;</span>
            </button>
            <button class="nav-button next" @click.stop="nextImage('segment')">
              <span class="arrow">&#10095;</span>
            </button>
          </div>
          <div class="image-title">
            Segmentation
          </div>
        </div>
      </div>
    </div>

    <!-- Table View with Vuetify v-data-table -->
    <div v-else-if="activeView === 'table'" class="table-container">
      <h2>Copy Number Data</h2>



      <!-- Vuetify Data Table -->
      <div>
        <v-data-table
          :headers="headers"
          :items="tableData"
          class="elevation-1"
        >
        </v-data-table>
      </div>
    </div>

    <!-- Lightbox for zooming and detailed viewing -->
    <Lightbox
      :visible="showZoom"
      :imgs="selectedCategoryImages"
      :index="currentIndex"
      @hide="showZoom = false"
      @on-index-change="currentIndex = $event"
    />
  </div>
</template>


<style scoped>
.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* View toggle styles */
.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-toggle button {
  padding: 10px 20px;
  margin: 0;
  border: none;
  background-color: #f2f2f2;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.view-toggle button:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.view-toggle button:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.view-toggle button.active {
  background-color: #4a76e8;
  color: white;
}

/* Image gallery grid */
.image-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.gallery-item {
  width: 100%;
  margin-bottom: 20px;
}

.image-container {
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
}

.gallery-image {
  width: 100%;
  height: 240px;
  object-fit: contain;
  background-color: white;
  cursor: pointer;
  border-bottom: 1px solid #eaeaea;
}

.image-title {
  background-color: #333;
  color: white;
  padding: 10px;
  font-size: 14px;
  text-align: center;
}

/* Carousel controls */
.carousel-controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-button {
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  margin: 0 10px;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.arrow {
  font-size: 16px;
}

/* Table styles */
.table-container {
  width: 100%;
}

/* Loading state */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4a76e8;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error state */
.error-container {
  text-align: center;
  padding: 40px 0;
  color: #e74c3c;
}

.error-container button {
  padding: 8px 16px;
  background-color: #4a76e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
