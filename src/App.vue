<template>
  <div
    class="w-full h-full relative flex flex-col min-h-screen"
    :class="{ 'blur-sm': isLoading || openCreateTodoModal}"
  >
    <router-view name="Header"/>
    <router-view name="default" class="flex-1"/>
    <router-view name="Footer"/>
    <CreateToDoModal />
  </div>
  <Loader v-if="isLoading"/>
  <MyAlert/>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader.vue";
import { useAuthenticationStore } from "@/store/authStore";
import { storeToRefs } from "pinia";
import MyAlert from "@/components/customUi/MyAlert.vue";
import { onMounted } from "vue";
import { getItem } from "@/helpers/LocalStorage";
import { useRouter } from "vue-router";
import { defineAsyncComponent } from "vue";
import { useToDoListStore } from "@/store/toDoListStore";

const authStore = useAuthenticationStore(),
  router = useRouter(),
  toDoStore = useToDoListStore(),
  { openCreateTodoModal } = storeToRefs(toDoStore),
  { isLoading } = storeToRefs(authStore);

onMounted(async () => {
  const userInfo = getItem("userInfo");
  if (userInfo) {
   await router.push({ name: "ToDo" })
    authStore.auth = true;
  }
})

const CreateToDoModal = defineAsyncComponent(
  () => import("@/modules/todo/CreateToDoModal.vue")
);
</script>
