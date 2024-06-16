<template>
  <div class="flex gap-3">
    <label for="input">
      <slot></slot>
    </label>
    <input
      @input="($event) => $emit('update:modelValue', $event.target.value)"
      :value="props.modelValue"
      :type="type"
      class="border-0 rounded focus-visible:outline-none h-10 p-2"
    >
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"])
const props = withDefaults(
  defineProps<{
    modelValue: string,
    type: string,
    placeholder: string
  }>(),
  {
    type: "text",
    placeholder: "select"
  }
);
</script>
