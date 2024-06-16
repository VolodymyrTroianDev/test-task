<template>
  <header class="sticky flex items-center h-16 bg-zinc-800 px-7 text-white">
    <div class="flex-grow flex justify-center">
      <router-link
        class="px-3 py-1 font-medium"
        active-class="text-cyan-600"
        tag="div"
        to="/"
      >
        Home
      </router-link>
      <router-link
        v-if="auth"
        class="px-3 py-1 font-medium"
        active-class="text-cyan-600"
        tag="div"
        to="/to-do"
      >
        Todo List
      </router-link>
    </div>
    <div class="flex justify-end gap-4">
      <button
        v-if="auth"
        @click="openCreateTodoModal = true"
        class="bg-cyan-500 hover:bg-cyan-600 border-0 rounded-md text-white px-3 py-1 font-medium"
        type="button"
      >
        Create todo
      </button>
      <router-link
        v-if="!auth"
        class="bg-cyan-500 hover:bg-cyan-600 border-0 rounded-md text-white px-3 py-1 font-medium"
        active-class="bg-cyan-600"
        tag="div"
        to="/login"
      >
        Login
      </router-link>
      <button
        v-else
        @click="authStore.logOut()"
        class="bg-cyan-500 hover:bg-cyan-600 border-0 rounded-md text-white px-3 py-1 font-medium"
        type="button"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/store/authStore";
import { storeToRefs } from "pinia";
import { useToDoListStore } from "@/store/toDoListStore";

const authStore = useAuthenticationStore(),
  toDoStore = useToDoListStore(),
  { openCreateTodoModal } = storeToRefs(toDoStore),
  { auth } = storeToRefs(authStore);
</script>
