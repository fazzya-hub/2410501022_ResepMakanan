<script setup>
import { ref } from 'vue'

defineProps({
  langkah: {
    type: Array,
    default: () => [],
  },
})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="border rounded-3">
    <button
      class="btn btn-light w-100 text-start d-flex justify-content-between align-items-center"
      type="button"
      @click="toggleAccordion"
    >
      <span>Langkah Memasak</span>
      <span>{{ isOpen ? '−' : '+' }}</span>
    </button>

    <Transition name="accordion">
      <div v-if="isOpen" class="p-3 border-top">
        <ol class="mb-0 ps-3">
          <li v-for="(item, index) in langkah" :key="`${item}-${index}`" class="mb-2">
            {{ item }}
          </li>
        </ol>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}
</style>
