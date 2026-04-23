import axios from 'axios'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

export const useResepStore = defineStore('resep', () => {
  const daftarResep = ref([])
  const filterKategori = ref('Semua')
  const filterKesulitan = ref('Semua')
  const halamanAktif = ref(1)
  const perHalaman = ref(6)
  const loading = ref(false)
  const error = ref('')

  const daftarKategori = computed(() => {
    const kategori = daftarResep.value
      .map((item) => item.kategori)
      .filter((item) => Boolean(item))
    return ['Semua', ...new Set(kategori)]
  })

  const daftarKesulitan = computed(() => {
    const kesulitan = daftarResep.value
      .map((item) => item.kesulitan)
      .filter((item) => Boolean(item))
    return ['Semua', ...new Set(kesulitan)]
  })

  const resepTerfilter = computed(() =>
    daftarResep.value.filter((resep) => {
      const cocokKategori =
        filterKategori.value === 'Semua' || resep.kategori === filterKategori.value
      const cocokKesulitan =
        filterKesulitan.value === 'Semua' || resep.kesulitan === filterKesulitan.value
      return cocokKategori && cocokKesulitan
    }),
  )

  const totalHalaman = computed(() => Math.max(1, Math.ceil(resepTerfilter.value.length / perHalaman.value)))

  const resepTerpaginasi = computed(() => {
    const startIndex = (halamanAktif.value - 1) * perHalaman.value
    return resepTerfilter.value.slice(startIndex, startIndex + perHalaman.value)
  })

  const setFilterKategori = (kategori) => {
    filterKategori.value = kategori
    halamanAktif.value = 1
  }

  const setFilterKesulitan = (kesulitan) => {
    filterKesulitan.value = kesulitan
    halamanAktif.value = 1
  }

  const setHalamanAktif = (halaman) => {
    if (halaman < 1 || halaman > totalHalaman.value) return
    halamanAktif.value = halaman
  }

  const fetchRecipes = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await axios.get('http://localhost:5000/resep')
      daftarResep.value = response.data
      if (halamanAktif.value > totalHalaman.value) {
        halamanAktif.value = totalHalaman.value
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat data resep.'
    } finally {
      loading.value = false
    }
  }

  const tambahResep = async (payload) => {
    loading.value = true
    error.value = ''
    try {
      const response = await api.post('/resep', payload)
      daftarResep.value.unshift(response.data)
      if (halamanAktif.value > totalHalaman.value) {
        halamanAktif.value = totalHalaman.value
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal menyimpan resep.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    daftarResep,
    filterKategori,
    filterKesulitan,
    halamanAktif,
    perHalaman,
    loading,
    error,
    daftarKategori,
    daftarKesulitan,
    resepTerfilter,
    resepTerpaginasi,
    totalHalaman,
    setFilterKategori,
    setFilterKesulitan,
    setHalamanAktif,
    fetchRecipes,
    tambahResep,
  }
})
