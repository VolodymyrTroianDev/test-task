import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { useAuthenticationStore } from "@/store/authStore";
import { getItem, setItem } from "@/helpers/LocalStorage";
import { filterOptions } from "@/enums/filterEnum";
import { useMessageStore } from "@/store/messageStore";
import type { Todo } from "@/types/TodoTypes";
import type { FiltersTodo } from "@/types/TodoTypes";
export const useToDoListStore = defineStore("to-do-list", () => {
  const state = ref([{}]),
    defaultUrl = "https://jsonplaceholder.typicode.com",
    auth = useAuthenticationStore(),
    messageStore = useMessageStore(),
    { isLoading } = storeToRefs(auth),
    usersId= ref<number>(0),
    openCreateTodoModal = ref(false),
    favoriteList = ref(getItem("favoriteList") || []);

  const getToDoList = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get(`${defaultUrl}/todos`)
      usersId.value = [...new Set(response.data.map(item => item.userId).sort((a, b) => a - b) )]
      state.value = response.data;
    } catch (e) {
      await messageStore.removeMessageAlert("error", e.messages);
    } finally {
      isLoading.value = false;
    }
  }
  const filteredToDoList = async (filter:FiltersTodo) => {
    isLoading.value = true;
    let url = `${defaultUrl}/todos`;

    const params = new URLSearchParams();

    switch (filter.sort) {
      case filterOptions.Completed:
        params.append('completed', 'true');
        break;
      case filterOptions.Uncompleted:
        params.append('completed', 'false');
        break;
    }

    if (filter.userId && filter.userId !== "All User") {
      params.append('userId', filter.userId.toString());
    }
    if (filter.q) {
      params.append('title', filter.q);
    }

    const queryString = params.toString();
    url += queryString ? `?${queryString}` : '';

    try {
      const response = await axios.get(url);
      state.value = response.data;
    } catch (e) {
      await messageStore.removeMessageAlert("error", e.messages);
    } finally {
      isLoading.value = false;
    }
  }

  const createTodo = async (values:Todo) => {
    try {
      const response = await axios.post(`${defaultUrl}/todos`, values);
      state.value.push(response.data);
    } catch (e) {
      await messageStore.removeMessageAlert("error", e.messages);
    } finally {
      isLoading.value = false;
    }
  }
  const addToFavorite = (item:Todo) => {
    state.value.filter(el => el.id === item.id)
    const isFavorite = favoriteList.value.some(el => el.id === item.id);
    if (isFavorite) {
      favoriteList.value = favoriteList.value.filter(el => el.id !== item.id);
    } else {
      favoriteList.value.push(item);
    }
    updateStateWithFavorites();
    setItem("favoriteList", favoriteList.value);
  }
  const updateStateWithFavorites = () => {
    state.value.forEach(item => {
      item.favorite = favoriteList.value.some(el => el.id === item.id);
    });
  }
  return {
    state,
    usersId,
    favoriteList,
    openCreateTodoModal,
    getToDoList,
    addToFavorite,
    filteredToDoList,
    createTodo,
    updateStateWithFavorites
  }
})
