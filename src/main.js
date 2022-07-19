import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// Bootstrap 
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

// Font Awesome
import '../node_modules/font-awesome/css/font-awesome.css';

//Datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//Main css
import './styles.css'
 
const app = createApp(App);

app.component('Datepicker', Datepicker);

app.use(store).use(router).mount('#app');