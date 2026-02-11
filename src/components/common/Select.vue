<template>
  <div class="select-wrapper">
    <label v-if="label">{{ label }}</label>

    <select :value="modelValue" @change="handleChange">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
// using generic T so this works with any type of value
defineProps<{
  modelValue: T;
  options: { label: string; value: T }[];
  label?: string;
}>();

// emit the change back to the parent
const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void;
}>();

// simple handler for the select change
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value as T);
};
</script>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}
</style>
