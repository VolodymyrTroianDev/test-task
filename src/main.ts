import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import  myCustomComponents  from "./components/customUi/index.ts";
import VueAxios from "vue-axios";
import axios from "axios";

const app = createApp(App);
const pinia = createPinia();
app
    .use(VueAxios, axios)
    .use(router)
    .use(pinia)
    .mount('#app')

const components = { ...myCustomComponents };
for (let index = 0; index < Object.keys(components).length; index++) {
  //global initialization of reused custom elements
  const element = Object.keys(components)[index];
  app.component(element, components[element]);
}
