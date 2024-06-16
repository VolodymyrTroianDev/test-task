<template>
  <Transition
    enter-from-class="translate-x-[10px] opacity-0"
    leave-to-class="translate-x-[10px] opacity-0"
    enter-active-class="transition duration-500"
    leave-active-class="transition duration-500"
  >
    <div
      v-if="messageStore.showAlert"
      class="fixed top-0 right-0 m-4 border  px-4 py-3 rounded"
      :class="{
        'bg-red-100 text-red-700 border-red-400': messageStore.message.type === 'Error',
        'bg-green-100 text-green-700 border-green-400': messageStore.message.type === 'Success',
        'bg-blue-100 text-blue-700 border-blue-400': messageStore.message.type === 'Info',
        'bg-yellow-100 text-yellow-700 border-yellow-400': messageStore.message.type === 'Warning',
      }"
    >
      <div class="relative flex flex-col gap-4">
        <button
          type="button"
          @click="messageStore.removeMessageAlert"
          class="absolute top-0 bottom-0 right-0 h-fit"
        >
          &#215;
        </button>
        <strong class="font-bold">
          {{ messageStore.message.type }}
        </strong>
        <span class="block sm:inline">{{ messageStore.message.text }}</span>
        <div class="w-full bg-gray-200 rounded h-1 mt-2 overflow-hidden">
          <div
            :style="{ width: messageStore.timerWidth + '%', transition: 'width .5s ease-out' }"
            class=" h-1 rounded"
            :class="{
              'bg-red-500': messageStore.message.type === 'Error',
              'bg-green-500': messageStore.message.type === 'Success',
              'bg-blue-500': messageStore.message.type === 'Info',
              'bg-yellow-500': messageStore.message.type === 'Warning',
            }"
          >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useMessageStore } from "@/store/messageStore.ts";

const messageStore = useMessageStore();
</script>
