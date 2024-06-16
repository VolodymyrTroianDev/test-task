import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useMessageStore } from "@/store/messageStore";
import { getItem, removeItem } from "@/helpers/LocalStorage";
import { useRouter } from "vue-router";

export const useAuthenticationStore = defineStore("authentication", () => {
  const state = ref({}),
    router = useRouter(),
    isLoading = ref<boolean>(false),
    auth = ref<boolean>(false),
    userInfo = ref<{}>(getItem("userInfo") || {}),
    messageStore = useMessageStore();

  const getUsers = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      state.value = response.data;
    } catch (e) {
      await messageStore.removeMessageAlert("error", e.messages);
    } finally {
      isLoading.value = false;
    }
  }

  const logOut = async () => {
    removeItem("userInfo");
    auth.value = false;
    await router.push({ name: "home" })
  }

  return {
    state,
    isLoading,
    auth,
    userInfo,
    getUsers,
    logOut
  }
})
