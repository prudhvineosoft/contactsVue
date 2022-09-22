import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
// font awesome css
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// bootstrap css & js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
createApp(App).use(store).use(router).use(moment).mount('#app')
