<template>
  <Teleport to="#app">
    <Transition>
      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-[500px] w-full" :class="props.styles"
           v-show="props.show" v-on-click-outside="closeModal">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps<{
  show: boolean;
  styles: string;
}>();

const emit = defineEmits(["closeModal"]);
/**
 * Closing function when clicking outside the modal window
 */
const closeModal = () => {
  emit("closeModal", false);
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 170ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
