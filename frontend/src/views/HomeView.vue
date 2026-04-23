<script setup>
import { computed, onMounted, ref } from 'vue'
import RecipeAccordion from '../components/RecipeAccordion.vue'
import RecipeModal from '../components/RecipeModal.vue'
import { useResepStore } from '../stores/resep'

const resepStore = useResepStore()
const showModal = ref(false)
const feedback = ref({ type: '', message: '' })

const halamanList = computed(() => Array.from({ length: resepStore.totalHalaman }, (_, i) => i + 1))

const submitResep = async (payload) => {
  try {
    await resepStore.tambahResep(payload)
    feedback.value = { type: 'success', message: 'Resep berhasil ditambahkan.' }
    showModal.value = false
  } catch {
    feedback.value = { type: 'danger', message: resepStore.error || 'Gagal menambahkan resep.' }
  }
}

onMounted(() => {
  resepStore.fetchRecipes()
})
</script>

<template>
  <main class="container py-4">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <h1 class="h3 mb-0">Resep Makanan Nusantara</h1>
      <button class="btn btn-primary" type="button" @click="showModal = true">+ Tambah Resep</button>
    </div>

    <div v-if="feedback.message" class="alert" :class="`alert-${feedback.type}`" role="alert">
      {{ feedback.message }}
    </div>

    <div class="card p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Filter Kategori</label>
          <select
            class="form-select"
            :value="resepStore.filterKategori"
            @change="resepStore.setFilterKategori($event.target.value)"
          >
            <option v-for="kategori in resepStore.daftarKategori" :key="kategori" :value="kategori">
              {{ kategori }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Filter Kesulitan</label>
          <select
            class="form-select"
            :value="resepStore.filterKesulitan"
            @change="resepStore.setFilterKesulitan($event.target.value)"
          >
            <option
              v-for="kesulitan in resepStore.daftarKesulitan"
              :key="kesulitan"
              :value="kesulitan"
            >
              {{ kesulitan }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="resepStore.loading" class="text-center py-4">Memuat data resep...</div>
    <div v-else-if="resepStore.error" class="alert alert-danger">{{ resepStore.error }}</div>
    <div v-else-if="!resepStore.resepTerpaginasi.length" class="alert alert-warning">
      Belum ada resep yang cocok dengan filter.
    </div>
    <div v-else class="row g-3">
      <div
        v-for="resep in resepStore.resepTerpaginasi"
        :key="resep._id"
        class="col-12 col-sm-6 col-lg-4 d-flex"
      >
        <article class="card shadow-sm w-100">
          <div class="card-body d-flex flex-column gap-3">
            <div>
              <h2 class="h5">{{ resep.nama }}</h2>
              <p class="text-muted mb-1">{{ resep.deskripsi || 'Tanpa deskripsi.' }}</p>
              <small class="badge text-bg-primary me-2">{{ resep.kategori || 'Tanpa kategori' }}</small>
              <small class="badge text-bg-secondary">{{ resep.kesulitan || 'Tanpa level' }}</small>
            </div>

            <div>
              <h3 class="h6">Bahan:</h3>
              <ul class="mb-0">
                <li v-for="(bahan, idx) in resep.bahan" :key="`${resep._id}-bahan-${idx}`">
                  {{ bahan }}
                </li>
              </ul>
            </div>

            <RecipeAccordion :langkah="resep.langkah" />
          </div>
        </article>
      </div>
    </div>

    <nav class="mt-4 d-flex justify-content-center" aria-label="Pagination resep">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: resepStore.halamanAktif === 1 }">
          <button class="page-link" @click="resepStore.setHalamanAktif(resepStore.halamanAktif - 1)">
            Sebelumnya
          </button>
        </li>
        <li
          v-for="page in halamanList"
          :key="`page-${page}`"
          class="page-item"
          :class="{ active: page === resepStore.halamanAktif }"
        >
          <button class="page-link" @click="resepStore.setHalamanAktif(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: resepStore.halamanAktif === resepStore.totalHalaman }">
          <button class="page-link" @click="resepStore.setHalamanAktif(resepStore.halamanAktif + 1)">
            Berikutnya
          </button>
        </li>
      </ul>
    </nav>

    <RecipeModal v-if="showModal" @close="showModal = false" @submit="submitResep" />
  </main>
</template>
