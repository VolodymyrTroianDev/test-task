<template>
  <div class="p-4">
    <ToDoUserInfo :user-data="userInfo"/>
    <section class="flex p-3 gap-4 flex-wrap bg-white rounded mb-4">
      <div class="flex gap-2 items-center">
        <span>Sort by</span>
        <select
          class="focus-visible:outline-0 rounded h-10 w-fit border-b-2"
          v-model="sortValue.sort"
          @change="toDoStore.filteredToDoList(sortValue)"
        >
          <option v-for="option in filterOptions">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="flex gap-2 items-center">
        <span>Sort by User Id</span>
        <select
          class="focus-visible:outline-0 rounded h-10 w-fit border-b-2"
          v-model="sortValue.userId"
          @change="toDoStore.filteredToDoList(sortValue)"
        >
          <option>
            All User
          </option>
          <option v-for="option in usersId">
            {{ option }}
          </option>
        </select>
      </div>

      <MyInput
        v-model="sortValue.q"
        @input="debouncedUpdateFilter"
        type="text"
        class="flex-row items-center border-b-2"
      >Filter by Title
      </MyInput>
    </section>
    <div class="flex flex-col gap-4">
      <template v-for="item in state">
        <ToDoItem
          :item="item"
          @update-favorite="toDoStore.addToFavorite"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/store/authStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useToDoListStore } from "@/store/toDoListStore";
import ToDoUserInfo from "@/modules/todo/ToDoUserInfo.vue";
import ToDoItem from "@/modules/todo/ToDoItem.vue";
import { filterOptions } from "@/enums/filterEnum";
import { getItem } from "@/helpers/LocalStorage";
import MyInput from "@/components/customUi/MyInput.vue";

const authStore = useAuthenticationStore(),
  toDoStore = useToDoListStore(),
  { state, usersId } = storeToRefs(toDoStore),
  sortValue = ref<string>({
    userId: getItem("userInfo")?.id || "All User",
    sort: filterOptions.All,
    q: ""
  }),
  { userInfo } = storeToRefs(authStore);

onMounted(async () => {
  await toDoStore.getToDoList();
  toDoStore.updateStateWithFavorites();
})
const updateInput = () => {
  toDoStore.filteredToDoList(sortValue.value)
}
const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timerId: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<T>) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debouncedUpdateFilter = debounce(updateInput, 500);
</script>
