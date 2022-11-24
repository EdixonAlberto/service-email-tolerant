import { createApp } from 'vue'
import VueCodeHighlight from 'vue-code-highlight'
import 'vue-code-highlight/themes/prism-okaidia.css'
import 'vue-code-highlight/themes/window.css'
import './style.css'
import App from './App.vue'

createApp(App).use(VueCodeHighlight).mount('#app')
