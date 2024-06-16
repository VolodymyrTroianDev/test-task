<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 class="block text-gray-700 text-xl font-bold mb-2">{{ userData.name }} ({{ userData.username }})</h2>
    <ul>
      <li v-for="(value, key) in userData" :key="key" class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="key">
          {{ formatKey(key) }}
        </label>
        <p :id="key" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
            <span v-if="typeof value === 'object'">
              <span v-for="(innerValue, innerKey) in value" :key="innerKey">
                {{ formatKey(innerKey) }}: {{ innerValue }}<br>
              </span>
            </span>
          <span v-else>{{ value }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userData: Record<string, any>;
}>()
const formatKey = (key: string | number) => {
  return key.charAt(0).toUpperCase() + key.slice(1);
};
</script>

