<template>
  <div class="search-container">
    <input type="text" :value="modelValue" @input="handleInput" :placeholder="placeholder" class="search-input" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  outline: none;
}

.search-input:focus {
  border-color: #94a3b8;
}
</style>
