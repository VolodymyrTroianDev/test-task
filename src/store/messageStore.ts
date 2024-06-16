import { ref } from "vue";
import { defineStore } from "pinia";

interface Message {
  type: string;
  text: string;
}

export const useMessageStore = defineStore("message", () => {
  const message = ref<Message>({}),
    showAlert = ref<boolean>(false),
    timerWidth = ref(100);

  let interval;
  const updateMessageAlert = (type: string, text: string) => {
    if (!showAlert.value) {
      showAlert.value = true;
      message.value.type = type;
      message.value.text = text;
      if (interval) clearInterval(interval);

      interval = setInterval(() => {
        if (timerWidth.value > 0) {
          timerWidth.value -= .5;
        } else {
          clearInterval(interval);
          removeMessageAlert();
        }
      }, 50);
    }
  }

  const removeMessageAlert = () => {
    clearInterval(interval);
    message.value = {};
    showAlert.value = false;
    timerWidth.value = 100;
  }

  return {
    message,
    showAlert,
    timerWidth,
    updateMessageAlert,
    removeMessageAlert
  }
})
