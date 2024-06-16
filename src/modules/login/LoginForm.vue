<template>
  <div class="flex w-screen h-screen justify-center items-center">
    <MyForm
      v-if="!authStore.isLoading"
      @submit="onSubmit"
      :validation-schema="validationSchema"
      v-slot="{ values }"
    >
      <div class="max-w-[500px] w-screen min-h-fit bg-neutral-200 gap-5 rounded">
        <header class="bg-neutral-400 flex justify-center items-center rounded-t h-12">
          <span class="text-gray-50">Description</span>
        </header>
        <section class="flex flex-col p-5 justify-between gap-5">
          <Field
            name="userName"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="flex-col"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
              type="text"
            >
              User Name
            </MyInput>
          </Field>
          <ErrorMessage
            name="userName"
            class="block text-red-500"
            as="div"
          />
          <Field
            name="phone"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="flex-col"
              type="text"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Phone number
            </MyInput>
          </Field>
          <ErrorMessage
            name="phone"
            class="block text-red-500"
            as="div"
          />
        </section>
        <footer class="p-5">
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 border-0 rounded-md text-white font-bold w-full h-12 text-center"
          >
            Register
          </button>
        </footer>
      </div>
    </MyForm>
  </div>
</template>
<script setup lang="ts">
import { ErrorMessage, Field, Form as MyForm } from "vee-validate";
import { useAuthenticationStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { setItem } from "@/helpers/LocalStorage";
import { useMessageStore } from "@/store/messageStore";
import { computed } from "vue";
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup'

const authStore = useAuthenticationStore(),
  messageStore = useMessageStore(),
  router = useRouter();

interface User {
  userName: string;
  phone: string;
}
const onSubmit = async (user:User) => {
  try {
    await authStore.getUsers();
    const filteredUsers = authStore.state.filter((item) => {
      return item.username === user.userName && item.phone === user.phone;
    });
    if (filteredUsers.length > 0) {
      authStore.auth = true;
      await router.push({ name: "ToDo" })
      setItem("userInfo", filteredUsers[filteredUsers.length - 1]);
      authStore.userInfo = filteredUsers[filteredUsers.length - 1];
      messageStore.updateMessageAlert("Success", "Success login");
    } else {
      messageStore.updateMessageAlert("Error", "User not found");
    }
  } catch (e) {
    console.error(e)
  }
};

const validationSchema = computed(() => {
  return toTypedSchema(
    object({
      userName: string().required().label("User name"),
      phone: string().required().matches(/^[0-9+.()-]*\s?(x[0-9]+)?$/, "Phone number must only contain numbers and symbols").label("Phone number"),
    })
  )
})
</script>

