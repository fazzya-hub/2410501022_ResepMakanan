<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close', 'submit'])

const initialForm = () => ({
  nama: '',
  kategori: 'Makanan Utama',
  kesulitan: 'Mudah',
  deskripsi: '',
  bahan: [''],
  langkah: [''],
})

const form = reactive(initialForm())

const resetForm = () => {
  Object.assign(form, initialForm())
}

const addBahan = () => form.bahan.push('')
const addLangkah = () => form.langkah.push('')
const removeBahan = (index) => form.bahan.splice(index, 1)
const removeLangkah = (index) => form.langkah.splice(index, 1)

const submitForm = () => {
  const payload = {
    nama: form.nama.trim(),
    kategori: form.kategori,
    kesulitan: form.kesulitan,
    deskripsi: form.deskripsi.trim(),
    bahan: form.bahan.map((item) => item.trim()).filter(Boolean),
    langkah: form.langkah.map((item) => item.trim()).filter(Boolean),
  }

  const confirmed = window.confirm('Yakin ingin menyimpan resep ini?')
  if (!confirmed) return

  emit('submit', payload)
  resetForm()
}

const closeModal = () => {
  resetForm()
  emit('close')
}
</script>

<template>
  <div class="modal-backdrop-custom">
    <div class="modal-dialog-custom card shadow-lg">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Tambah Resep Baru</h5>
        <button class="btn btn-sm btn-outline-secondary" type="button" @click="closeModal">X</button>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="form-label">Nama Resep</label>
            <input v-model="form.nama" class="form-control" required />
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">Kategori</label>
              <select v-model="form.kategori" class="form-select">
                <option>Makanan Utama</option>
                <option>Snack</option>
                <option>Minuman</option>
                <option>Dessert</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Tingkat Kesulitan</label>
              <select v-model="form.kesulitan" class="form-select">
                <option>Mudah</option>
                <option>Sedang</option>
                <option>Sulit</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea v-model="form.deskripsi" class="form-control" rows="2" />
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label class="form-label mb-0">Bahan</label>
              <button class="btn btn-sm btn-outline-primary" type="button" @click="addBahan">
                + Tambah Bahan
              </button>
            </div>
            <div v-for="(_, index) in form.bahan" :key="`bahan-${index}`" class="d-flex gap-2 mb-2">
              <input v-model="form.bahan[index]" class="form-control" :required="index === 0" />
              <button
                class="btn btn-outline-danger"
                type="button"
                :disabled="form.bahan.length === 1"
                @click="removeBahan(index)"
              >
                Hapus
              </button>
            </div>
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label class="form-label mb-0">Langkah Memasak</label>
              <button class="btn btn-sm btn-outline-primary" type="button" @click="addLangkah">
                + Tambah Langkah
              </button>
            </div>
            <div v-for="(_, index) in form.langkah" :key="`langkah-${index}`" class="d-flex gap-2 mb-2">
              <input v-model="form.langkah[index]" class="form-control" :required="index === 0" />
              <button
                class="btn btn-outline-danger"
                type="button"
                :disabled="form.langkah.length === 1"
                @click="removeLangkah(index)"
              >
                Hapus
              </button>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-secondary" type="button" @click="closeModal">Batal</button>
            <button class="btn btn-success" type="submit">Simpan Resep</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-dialog-custom {
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
