import { createApp } from 'vue'
// Elment plus
import ElementPlus from 'element-plus'
import ElMessage from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/es'

// importo los componentes de forma global
import Modal from './components/modal/index.vue'
import ModalSinCerrar from './components/modal_sin_cerrar/index.vue'
import Boton from './components/boton/index.vue'
import MacaSelectBox from './components/select_box/index.vue'

//
// PRIMEVUE
//

// PrimeVue
import PrimeVue from 'primevue/config';

// PrimeVue Components
import 'primevue/resources/themes/saga-blue/theme.css'        //theme
import 'primevue/resources/primevue.min.css'                  //core css
import 'primeicons/primeicons.css'                            //icons
// toast
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

// modal confirmacion
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

// modal dinamico
import DynamicDialog from 'primevue/dynamicdialog'
import DialogService from 'primevue/dialogservice';

// modal
import Dialog from 'primevue/dialog';

// tabla y componentes
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row

// Dropdown (Select)
import Dropdown from 'primevue/dropdown';

// InputNumber
import InputNumber from 'primevue/inputnumber';

// Switch
import InputSwitch from 'primevue/inputswitch';

//Tag
import Tag from 'primevue/tag';

// Button
import Button from 'primevue/button'

// InputText
import InputText from 'primevue/inputtext'

// Input Password
import Password from 'primevue/password';


//
// FIN PRIME VUE
//


import App from './App.vue'

// importamos las rutas
import router from './router/index.js'

// vuex
import { createStore } from 'vuex'



import axios from 'axios'
import VueAxios from 'vue-axios'

// usado para login
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'X-CSRF-TOKEN': window.csrf_token
//   // 'X-CSRF-TOKEN': ('meta[name="csrf-token"]').attr('content')
// };

console.log(import.meta.env.VITE_API_URL);


const variableGlobal = {
  data() {
    return {
      // base_url: 'http://localhost:8000/api'
    }
  },
}

// Create a new store instance.
const store = createStore({
  state: { 
    user: null,
    auth: false,
  },
  mutations: { 
    SET_USER(state, user){
      state.user = user
      state.auth = Boolean(user)
    }
  },
  actions:{
    async login({ dispatch }, credentials ){
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      return dispatch("getUser");
    },

    async logout({ dispatch }){
      await axios.post("/logout");
      return dispatch("getUser");
    },

    getUser({ commit }){
      axios.get("/api/user")
        .then(res => {
          commit('SET_USER', res.data)
        })
        .catch(() => {
          commit('SET_USER', null)
        })
    },
  },
  modules:{}
})

store.dispatch('getUser');

createApp(App)
  .component('Modal', Modal)
  .component('ModalSinCerrar', ModalSinCerrar)
  .component('Boton', Boton)
  .component('MacaSelectBox', MacaSelectBox)
  .component('Button', Button)
  .component('InputText', InputText)
  .component('Password', Password)
  .component('Toast', Toast)
  .component('ConfirmDialog', ConfirmDialog)
  .component('DynamicDialog', DynamicDialog)
  .component('Modal', Modal)
  .component('Dialog', Dialog)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('ColumnGroup', ColumnGroup)
  .component('Row', Row)
  .component('Dropdown', Dropdown)
  .component('InputNumber', InputNumber)
  .component('InputSwitch', InputSwitch)
  .component('Tag', Tag)
  .use(router)
  .use(ElementPlus, {locale})
  .use(ElMessage)
  .use(VueAxios, axios)
  .mixin(variableGlobal)
  .use(store)
  .use(PrimeVue, {
    locale: {
        accept: 'Aceptar',
        reject: 'Rechazar',
        //...
    }})
  .use(ToastService)
  .use(ConfirmationService)
  .use(DialogService)
  .mount('#app')
