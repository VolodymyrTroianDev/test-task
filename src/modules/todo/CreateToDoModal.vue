<template>
  <MyModal
    :show="openCreateTodoModal"
    @close-modal="openCreateTodoModal = false"
  >
    <MyForm
      @submit="onSubmit"
      :validation-schema="validationSchema"
      v-slot="{ values }"
    >
      <div class="w-[500px] min-h-fit bg-neutral-200 gap-5 rounded">
        <header class="bg-neutral-400 flex justify-center items-center rounded-t h-12">
          <span class="text-gray-50">Create To Do</span>
          <button
            type="button"
            @click="openCreateTodoModal = false"
            class="absolute top-0 bottom-0 right-0 h-fit px-4 py-1 text-2xl hover:scale-125 transition-all"
          >
            &#215;
          </button>
        </header>
        <section class="flex flex-col p-5 justify-between gap-5">
          <Field
            name="userId"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="flex-col"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
              type="text"
            >
              User Id
            </MyInput>
          </Field>
          <Field
            name="title"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="flex-col"
              type="text"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Title
            </MyInput>
          </Field>
        </section>
        <footer class="p-5">
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 border-0 rounded-md text-white font-bold w-full h-12 text-center"
          >
            Create
          </button>
        </footer>
      </div>
    </MyForm>
  </MyModal>
</template>
<script setup lang="ts">
import { Field, Form as MyForm } from "vee-validate";
import { useToDoListStore } from "@/store/toDoListStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import type { Todo } from "../../types/TodoTypes";

const toDoStore = useToDoListStore(),
  { openCreateTodoModal } = storeToRefs(toDoStore),
  router = useRouter();

const onSubmit = async (values:Todo) => {
  try {
    await toDoStore.createTodo(values);
    await router.push({ name: "ToDo" })
  } catch (e) {
    console.error(e)
  } finally {
    openCreateTodoModal.value = false
  }
}
</script>
