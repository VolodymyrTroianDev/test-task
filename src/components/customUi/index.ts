import { defineAsyncComponent } from "vue";

const MyInput = defineAsyncComponent(
  () => import("@/components/customUi/MyInput.vue")
);
const MyModal = defineAsyncComponent(
  () => import("@/components/customUi/MyModal.vue")
);
export default {
  MyInput,
  MyModal
}
