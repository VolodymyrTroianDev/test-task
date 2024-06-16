<template>
  <div class="w-full bg-white rounded-xl shadow-md overflow-hidden flex justify-between items-center p-4">
    <div class="">
      <p class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{ item.title }}</p>
      <p class="mt-2 text-gray-500">ID example: {{ item.id }} ID user: {{ item.userId }}</p>
    </div>
    <star
      class="cursor-pointer hover:fill-yellow-500 transition-all duration-300 ease-in-out"
      :class="{ 'fill-yellow-500': item?.favorite }"
      @click="$emit('updateFavorite', item)"
    />
  </div>
</template>

<script setup lang="ts">
import Star from "@/assets/star.vue";

defineProps<{ item: {} }>();
defineEmits(["updateFavorite"])
</script>

<style scoped>
</style>
